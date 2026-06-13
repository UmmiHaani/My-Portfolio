import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "../../data/blogs";
import {
  BLOG_CATEGORY_LABELS,
  formatBlogDate,
} from "../../data/blogs";

interface BlogLogRowProps {
  post: BlogPost;
}

export function BlogLogRow({ post }: BlogLogRowProps) {
  const categoryLabel = BLOG_CATEGORY_LABELS[post.category].toUpperCase();

  return (
    <Link
      to={`/blogs/${post.slug}`}
      className={[
        "blog-log-row group",
        post.pinned ? "blog-log-row--pinned" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="blog-log-row__body">
        <p className="blog-log-row__meta">
          <span className="blog-log-row__code">{post.fileCode}</span>
          {post.pinned ? (
            <>
              <span className="blog-log-row__sep" aria-hidden>
                ·
              </span>
              <span className="blog-log-row__pinned">Pinned</span>
            </>
          ) : null}
          <span className="blog-log-row__sep" aria-hidden>
            ·
          </span>
          <span className="blog-log-row__category">{categoryLabel}</span>
          <span className="blog-log-row__sep" aria-hidden>
            ·
          </span>
          <span>{formatBlogDate(post.date)}</span>
        </p>
        <h2 className="blog-log-row__title">{post.title}</h2>
        <p className="blog-log-row__excerpt">{post.excerpt}</p>
        <p className="blog-log-row__stats">
          {post.readMinutes} min read
          {post.album.length > 0 ? (
            <>
              <span aria-hidden> · </span>
              {post.album.length} photo{post.album.length === 1 ? "" : "s"}
            </>
          ) : null}
          {post.series ? (
            <>
              <span aria-hidden> · </span>
              {post.series}
            </>
          ) : null}
        </p>
      </div>

      <ArrowRight
        className="blog-log-row__arrow h-4 w-4 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
        strokeWidth={1.75}
        aria-hidden
      />
    </Link>
  );
}
