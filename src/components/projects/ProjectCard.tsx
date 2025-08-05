import * as React from "react";

export interface IProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  children: React.ReactNode;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  children,
}: IProjectCardProps) {
  return (
    <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 md:flex-row flex-col">
      <div className="items-center self-start">
        <h3 className="text-xl font-bold mb-2 md:text-left text-center">
          {title}
        </h3>
        <p className="text-tx-secondary dark:text-dark-tx-secondary md:text-left text-center text-sm">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 my-2 justify-center md:justify-start">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-300 dark:bg-dark-bg dark:text-dark-bg-tx-primary dark:hover:bg-dark-bg-hover transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 my-2 justify-center md:justify-start">
          {children}
        </div>
      </div>
      <img
        src={image}
        alt={title}
        className="lg:w-[350px] lg:h-[200px] w-[250px] h-[150px] rounded-lg self-center drop-shadow-xl"
        loading="lazy"
      />
    </div>
  );
}
