import type { Blog } from "../../types/types";

export interface IBlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: IBlogCardProps) {
  return (
    <article className="w-full max-w-3xl mx-auto group">
      <a href={`/blog/${blog.route}`} className="block">
        <div className="card-vintage rounded-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <time className="text-xs font-mono text-ink-muted dark:text-dark-ink-muted uppercase tracking-wider">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              <h3 className="font-serif text-xl md:text-2xl font-semibold text-ink dark:text-dark-ink mb-3 group-hover:text-sepia dark:group-hover:text-dark-sepia transition-colors">
                {blog.title}
              </h3>

              <p className="text-ink-faded dark:text-dark-ink-faded text-sm leading-relaxed mb-4 font-body">
                {blog.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <span key={tag} className="tag-vintage text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-2 text-sepia dark:text-dark-sepia text-sm font-medium group-hover:gap-3 transition-all">
                Continue Reading
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>

            {/* Image */}
            <div className="md:w-64 flex-shrink-0">
              <div className="overflow-hidden rounded-sm border border-paper-dark dark:border-dark-paper-elevated">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}
