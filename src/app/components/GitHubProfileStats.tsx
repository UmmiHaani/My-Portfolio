import { useEffect, useState } from "react";
import { Code2, GitFork, Star } from "lucide-react";

interface GitHubStats {
  stars: number;
  forks: number;
  followers: number;
  repos: number;
}

interface GitHubProfileStatsProps {
  username: string;
}

const CACHE_KEY_PREFIX = "github-stats:";
const CACHE_TTL_MS = 30 * 60 * 1000;

/** Shown when the API is rate-limited or unreachable (keeps the banner usable). */
const STATS_FALLBACK: Record<string, GitHubStats> = {
  UmmiHaani: { stars: 1, forks: 0, followers: 0, repos: 16 },
};

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function apiBase(): string {
  if (import.meta.env.DEV && !import.meta.env.VITE_GITHUB_TOKEN) {
    return "/api/github";
  }
  return "https://api.github.com";
}

function readCache(username: string): GitHubStats | null {
  try {
    const raw = sessionStorage.getItem(`${CACHE_KEY_PREFIX}${username}`);
    if (!raw) return null;
    const { stats, at } = JSON.parse(raw) as { stats: GitHubStats; at: number };
    if (Date.now() - at > CACHE_TTL_MS) return null;
    return stats;
  } catch {
    return null;
  }
}

function writeCache(username: string, stats: GitHubStats) {
  try {
    sessionStorage.setItem(
      `${CACHE_KEY_PREFIX}${username}`,
      JSON.stringify({ stats, at: Date.now() }),
    );
  } catch {
    /* ignore quota errors */
  }
}

async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const base = apiBase();
  const headers = githubHeaders();

  const userRes = await fetch(`${base}/users/${username}`, { headers });
  if (!userRes.ok) {
    throw new Error(`GitHub user request failed: ${userRes.status}`);
  }
  const user = await userRes.json();

  let stars = 0;
  let forks = 0;

  const reposRes = await fetch(
    `${base}/users/${username}/repos?per_page=100&sort=updated&type=owner`,
    { headers },
  );

  if (reposRes.ok) {
    const repos: { stargazers_count?: number; forks_count?: number }[] =
      await reposRes.json();
    if (Array.isArray(repos)) {
      for (const repo of repos) {
        stars += repo.stargazers_count ?? 0;
        forks += repo.forks_count ?? 0;
      }
    }
  }

  return {
    stars,
    forks,
    followers: user.followers ?? 0,
    repos: user.public_repos ?? 0,
  };
}

function StatItem({
  icon: Icon,
  label,
  value,
  loading,
}: {
  icon: typeof Star;
  label: string;
  value: string;
  loading: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
      <span className="whitespace-nowrap">
        <span className="font-semibold tracking-wide">{label}</span>{" "}
        <span
          className={`tabular-nums ${loading ? "inline-block min-w-[1.5ch] animate-pulse rounded bg-gray-300/60" : ""}`}
        >
          {loading ? "··" : value}
        </span>
      </span>
    </div>
  );
}

export function GitHubProfileStats({ username }: GitHubProfileStatsProps) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    const normalized = username.trim();

    if (!normalized) {
      setLoading(false);
      setStats(null);
      return;
    }

    async function load() {
      setLoading(true);

      const cached = readCache(normalized);
      if (cached) {
        if (!cancelled) {
          setStats(cached);
          setLoading(false);
        }
        return;
      }

      try {
        const data = await fetchGitHubStats(normalized);
        writeCache(normalized, data);
        if (!cancelled) {
          setStats(data);
        }
      } catch {
        const fallback = STATS_FALLBACK[normalized];
        if (!cancelled && fallback) {
          setStats(fallback);
        } else if (!cancelled) {
          setStats({ stars: 0, forks: 0, followers: 0, repos: 0 });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [username]);

  const format = (n: number) => n.toLocaleString();

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-700 sm:gap-8 sm:text-sm">
      <StatItem
        icon={Star}
        label="STARS"
        value={stats ? format(stats.stars) : "0"}
        loading={loading}
      />
      <StatItem
        icon={GitFork}
        label="FORKS"
        value={stats ? format(stats.forks) : "0"}
        loading={loading}
      />
      <StatItem
        icon={Code2}
        label="FOLLOWERS"
        value={stats ? format(stats.followers) : "0"}
        loading={loading}
      />
    </div>
  );
}
