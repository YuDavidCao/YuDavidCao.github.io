import type { APIRoute } from "astro";
import blogData from "../data/blog.json";
import { SITE, absoluteUrl } from "../config/site";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = () => {
  const sortedBlogs = [...blogData.blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const items = sortedBlogs
    .map(
      (blog) => `
    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${absoluteUrl(`/blog/${blog.route}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${blog.route}`)}</guid>
      <description>${escapeXml(blog.summary)}</description>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE.title} - Blog`)}</title>
    <link>${absoluteUrl("/blogs")}</link>
    <description>${escapeXml(`Blog posts by ${SITE.author.name}`)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
