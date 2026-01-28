import { useEffect, useState } from "react";
import blogs from "../../data/blog.json";
import { BlogCard } from "../blogs/BlogCard";
import { FadeIn, StaggerContainer, StaggerItem } from "../effects/FadeIn";
import type { Blog } from "../../types/types";

export function BlogsHome() {
  const [tags, setTags] = useState<Map<string, number>>(new Map());
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(
    blogs.blogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    getExistingTags();
  }, []);

  const getExistingTags = () => {
    const existingTags = new Map<string, number>();
    for (const currentBlog of blogs.blogs) {
      for (const currentTag of currentBlog.tags) {
        existingTags.set(currentTag, (existingTags.get(currentTag) ?? 0) + 1);
      }
    }
    setTags(existingTags);
  };

  const onSearchStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const onTagSelected = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };

  useEffect(() => {
    const filtered = blogs.blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchString.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchString.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchString.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        blog.tags.some((tag) => selectedTags.includes(tag));
      return matchesSearch && matchesTags;
    });
    setFilteredBlogs(filtered);
  }, [searchString, selectedTags]);

  return (
    <div className="w-full flex flex-col items-center py-24 px-6 min-h-screen">
      <FadeIn direction="up">
        <p className="text-ink-muted dark:text-dark-ink-muted text-sm uppercase tracking-[0.2em] mb-4 font-mono text-center">
          Writings
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink dark:text-dark-ink mb-4 text-center">
          The Journal
        </h1>
      </FadeIn>

      <FadeIn direction="up" delay={0.2}>
        <div className="vintage-divider mb-8 w-48">
          <span className="flourish">❦</span>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.3}>
        <p className="text-center mb-8 text-ink-faded dark:text-dark-ink-faded max-w-xl font-body">
          Thoughts on programming, technology, and lessons learned along the way.
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={0.4} className="w-full max-w-3xl">
        <div className="flex flex-col gap-4 mb-12">
          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ink-muted dark:text-dark-ink-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              placeholder="Search articles..."
              className="w-full rounded-sm bg-paper-light dark:bg-dark-paper-light border border-paper-dark dark:border-dark-paper-elevated text-ink dark:text-dark-ink placeholder-ink-muted dark:placeholder-dark-ink-muted h-12 pl-12 pr-4 text-sm font-body transition-all duration-200 focus:border-sepia dark:focus:border-dark-sepia"
              value={searchString}
              onChange={onSearchStringChange}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags &&
              Array.from(tags)
                .sort((a, b) => b[1] - a[1])
                .map(([key, value]: [string, number]) => {
                  const isSelected = selectedTags.includes(key);
                  return (
                    <button
                      key={key}
                      className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all duration-200 ${
                        isSelected
                          ? "bg-sepia dark:bg-dark-sepia text-paper dark:text-dark-paper border-sepia dark:border-dark-sepia"
                          : "bg-transparent text-ink-faded dark:text-dark-ink-faded border-ink-muted/30 dark:border-dark-ink-muted/30 hover:border-sepia dark:hover:border-dark-sepia"
                      }`}
                      onClick={() => onTagSelected(key)}
                    >
                      {isSelected && <span className="mr-1">✓</span>}
                      {`${key} (${value})`}
                    </button>
                  );
                })}
          </div>
        </div>
      </FadeIn>

      <StaggerContainer
        className="w-full flex flex-col items-center gap-6"
        staggerDelay={0.1}
      >
        {filteredBlogs.map((blog) => (
          <StaggerItem key={blog.route}>
            <BlogCard blog={{ ...blog, image: blog.image }} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filteredBlogs.length === 0 && (
        <FadeIn direction="up" className="text-center py-12">
          <p className="text-ink-faded dark:text-dark-ink-faded text-lg font-body italic">
            No articles found matching your criteria.
          </p>
        </FadeIn>
      )}
    </div>
  );
}
