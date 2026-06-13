import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BlogPostBody } from "../../components/blogs/BlogPostBody";
import { BlogVisualAnnex } from "../../components/blogs/BlogVisualAnnex";
import {
  BLOG_CATEGORY_LABELS,
  formatBlogDate,
  getBlogPost,
} from "../../data/blogs";
import { SiteFooter } from "../../components/SiteFooter";

export function BlogPostPage() {
  const reducedMotion = useReducedMotion();
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  const categoryLabel = BLOG_CATEGORY_LABELS[post.category].toUpperCase();

  return (
    <>
      <motion.div
        className="re4-save-ui bg-[var(--pf-bg)] text-[var(--pf-text-muted)] transition-colors duration-200"
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-6xl px-8 pt-16 pb-8">
          <Link to="/blogs" className="blog-post-back">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            Back to log
          </Link>

          <header className="blog-post-header">
            <p className="blog-post-header__meta">
              <span>{post.fileCode}</span>
              <span aria-hidden> · </span>
              <span>{categoryLabel}</span>
              <span aria-hidden> · </span>
              <span>{formatBlogDate(post.date)}</span>
              <span aria-hidden> · </span>
              <span>{post.readMinutes} min read</span>
            </p>
            <h1 className="blog-post-header__title">{post.title}</h1>
            {post.series ? (
              <p className="blog-post-header__series re4-save-prompt">
                Series — {post.series}
              </p>
            ) : null}
          </header>

          <div className="blog-post-layout">
            <div className="blog-post-layout__prose">
              <BlogPostBody blocks={post.body} />
            </div>
            <div className="blog-post-layout__annex">
              <BlogVisualAnnex
                fileCode={post.fileCode}
                label={post.albumLabel}
                images={post.album}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <SiteFooter />
    </>
  );
}
