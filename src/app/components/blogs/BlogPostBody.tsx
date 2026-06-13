import type { BlogBlock } from "../../data/blogs";
import { BlogArrowTimeline } from "./BlogArrowTimeline";

interface BlogPostBodyProps {
  blocks: BlogBlock[];
}

export function BlogPostBody({ blocks }: BlogPostBodyProps) {
  return (
    <article className="blog-prose">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={index} className="blog-prose__heading">
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={index} className="blog-prose__p">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={index} className="blog-prose__list">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={index} className="blog-prose__code">
                <code>{block.code}</code>
              </pre>
            );
          case "timeline":
            return <BlogArrowTimeline key={index} steps={block.steps} />;
          default:
            return null;
        }
      })}
    </article>
  );
}
