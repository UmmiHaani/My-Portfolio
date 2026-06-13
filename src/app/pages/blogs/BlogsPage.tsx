import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { BlogCategory } from "../../data/blogs";
import { blogPosts, sortBlogPosts } from "../../data/blogs";
import { BlogFilterBar } from "../../components/blogs/BlogFilterBar";
import { BlogLogRow } from "../../components/blogs/BlogLogRow";
import { SiteFooter } from "../../components/SiteFooter";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export function BlogsPage() {
  const reducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<"all" | BlogCategory>("all");

  const filteredPosts = useMemo(() => {
    const posts =
      filter === "all"
        ? blogPosts
        : blogPosts.filter((post) => post.category === filter);

    return sortBlogPosts(posts);
  }, [filter]);

  return (
    <>
      <motion.div
        className="re4-save-ui bg-[var(--pf-bg)] text-[var(--pf-text-muted)] transition-colors duration-200"
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-5xl px-8 pt-16 pb-8">
          <header className="re4-projects-header mb-6 flex items-center gap-3">
            <div className="h-0.5 w-6 shrink-0 bg-[var(--pf-accent)]/80" />
            <div>
              <h1 className="re4-projects-header__title">Blogs</h1>
              <p className="re4-projects-header__sub">
                Transmission log — notes & frames from the CS journey
              </p>
            </div>
          </header>

          <BlogFilterBar active={filter} onChange={setFilter} />

          <section className="blog-log" aria-label="Transmission log entries">
            {filteredPosts.length > 0 ? (
              <motion.ul
                className="blog-log__list"
                initial={reducedMotion ? false : "hidden"}
                animate="visible"
                variants={reducedMotion ? undefined : listVariants}
              >
                {filteredPosts.map((post) => (
                  <motion.li
                    key={post.slug}
                    variants={reducedMotion ? undefined : rowVariants}
                  >
                    <BlogLogRow post={post} />
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <p className="blog-log__empty re4-save-prompt">
                No entries in this category yet.
              </p>
            )}
          </section>
        </div>
      </motion.div>
      <SiteFooter />
    </>
  );
}
