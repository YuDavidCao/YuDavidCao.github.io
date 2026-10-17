/** Stable short path for a blog post. `id` is the publication number in blog.json. */
export function shortBlogPath(id: number): string {
  return `/b/${id}`;
}
