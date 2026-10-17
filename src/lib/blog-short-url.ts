/**
 * Stable short path for a blog post. `id` is the publication number in blog.json.
 * Trailing slash matches the built `b/<id>/index.html`, skipping GitHub Pages' 301.
 */
export function shortBlogPath(id: number): string {
  return `/b/${id}/`;
}
