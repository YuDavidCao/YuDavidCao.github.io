import { useEffect, useState } from "react";
import blogs from "../../data/blog.json";
import { BlogCard } from "../blogs/BlogCard";
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

  console.log("Rendering tags:", Array.from(tags.entries()));

  useEffect(() => {
    getExistingTags();
  }, []);

  const getExistingTags = () => {
    const existingTags = new Map<string, number>();
    for (let i = 0; i < blogs.blogs.length; i++) {
      const currentBlog = blogs.blogs[i];
      for (let f = 0; f < currentBlog.tags.length; f++) {
        const currentTag = currentBlog.tags[f];
        existingTags.set(currentTag, (existingTags.get(currentTag) ?? 0) + 1);
      }
    }
    console.log("Extracted tags:", Array.from(existingTags.entries()));
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
    <div
      className="w-full h-full flex flex-col items-center justify-center py-[100px] text-tx-primary dark:text-dark-tx-primary min-h-screen"
    >
      <h2 className="text-3xl font-bold mb-10 dark:text-dark-tx-primary text-tx-primary">
        Welcome to my blogs page!
      </h2>
      <div className="flex flex-col gap-4 w-3/5 mb-10">
        <label className="flex flex-col min-w-40 flex-1 w-full">
          <input
            placeholder="Search for title / content / summary"
            className="form-input w-full rounded-lg bg-primary border border-tertiary text-tx-primary placeholder-tx-tertiary h-14 p-4 text-base font-normal focus:outline-none focus:ring-0 focus:border-tertiary dark:bg-dark-primary dark:border-dark-tertiary dark:text-dark-tx-primary dark:placeholder-dark-tx-tertiary"
            value={searchString}
            onChange={onSearchStringChange}
          />
        </label>
        <div className="flex flex-wrap gap-4">
          {tags &&
            Array.from(tags)
              .sort((a, b) => b[1] - a[1])
              .map(([key, value]: [string, number]) => {
                return (
                  <button
                    key={key}
                    className={`bg-secondary text-tx-primary px-4 pt-3 pb-2 rounded-lg hover:bg-tertiary transition-colors text-sm font-bold dark:bg-dark-bg dark:text-dark-bg-tx-primary dark:hover:bg-dark-bg-hover ${
                      selectedTags.includes(key)
                        ? "bg-tertiary dark:bg-dark-bg-hover"
                        : ""
                    }`}
                    onClick={() => onTagSelected(key)}
                  >
                    {selectedTags.includes(key) && (
                      <span className="mr-2">✓</span>
                    )}
                    {`${key} (${value})`}
                  </button>
                );
              })}
        </div>
      </div>
      {filteredBlogs.map((blog) => (
        <BlogCard
          key={blog.route}
          blog={{ ...blog, image: blog.image }}
        />
      ))}
    </div>
  );
}
