import type { Blog } from "../../types/types";

export interface IBlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: IBlogCardProps) {
  return (
    <div className="w-3/5 flex gap-4 text-xl rounded-lg py-8 md:flex-row flex-col">
      <div className="items-center self-start flex-1">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <h3 className="text-xl font-bold mb-2 md:text-left text-center">
            {blog.title}
          </h3>
          <span className="text-tx-secondary text-sm dark:text-dark-tx-secondary md:self-start self-center mb-2 md:mb-0">
            {new Date(blog.date).toLocaleDateString()}
          </span>
        </div>
        <p className="text-tx-secondary dark:text-dark-tx-secondary md:text-left text-center text-sm">
          {blog.summary}
        </p>
        <div className="flex flex-wrap gap-2 my-2 justify-center md:justify-start">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-300 dark:bg-dark-bg dark:text-dark-bg-tx-primary dark:hover:bg-dark-bg-hover transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex w-full md:justify-start justify-center">
          <a
            href={`/blog/${blog.route}`}
            className="bg-secondary text-tx-primary px-4 pt-3 pb-2 rounded-lg hover:bg-tertiary transition-colors text-sm font-bold mt-4 dark:bg-dark-bg dark:text-dark-bg-tx-primary dark:hover:bg-dark-bg-hover mb-2 md:mb-0 text-center"
          >
            Read More
          </a>
        </div>
      </div>
      <a href={`/blog/${blog.route}`} className="block">
        <img
          src={blog.image}
          alt={blog.title}
          className="max-w-[350px] w-full h-auto lg:h-[200px] rounded-lg self-center drop-shadow-xl object-cover cursor-pointer transition-transform duration-300 hover:drop-shadow-2xl hover:scale-105"
          loading="lazy"
        />
      </a>
    </div>
  );
}
