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
    <article className="w-full max-w-3xl mx-auto group">
      <div className="card-vintage rounded-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Content */}
          <div className="flex-1">
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-ink dark:text-dark-ink mb-3">
              {title}
            </h3>

            <p className="text-ink-faded dark:text-dark-ink-faded text-sm leading-relaxed mb-4 font-body">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span key={tag} className="tag-vintage text-xs">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {children}
            </div>
          </div>

          {/* Image */}
          <div className="md:w-72 flex-shrink-0">
            <div className="overflow-hidden rounded-sm border border-paper-dark dark:border-dark-paper-elevated">
              <img
                src={image}
                alt={title}
                className="w-full h-44 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
