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

async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const userRes = await fetch(`https://api.github.com/users/${username}`);
  if (!userRes.ok) {
    throw new Error("GitHub user not found");
  }
  const user = await userRes.json();

  let stars = 0;
  let forks = 0;
  let page = 1;

  while (page <= 5) {
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&type=owner`,
    );
    if (!reposRes.ok) break;

    const repos: { stargazers_count?: number; forks_count?: number }[] =
      await reposRes.json();

    if (!Array.isArray(repos) || repos.length === 0) break;

    for (const repo of repos) {
      stars += repo.stargazers_count ?? 0;
      forks += repo.forks_count ?? 0;
    }

    if (repos.length < 100) break;
    page += 1;
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
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchGitHubStats(username.trim());
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) {
          setStats(null);
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (username.trim()) load();
    else {
      setLoading(false);
      setError(true);
    }

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (error) {
    return (
      <p className="mt-8 max-w-md text-center text-xs text-gray-500 sm:text-sm">
        GitHub stats unavailable — check username{" "}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-700">
          {username || "(not set)"}
        </code>
      </p>
    );
  }

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
