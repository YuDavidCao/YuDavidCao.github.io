export const SITE = {
  name: "David Cao",
  title: "David Cao's Personal Website",
  description:
    "David Cao's personal website, including projects, blogs, and contacts",
  url: "https://yudavidcao.github.io",
  defaultImage: "/profile.png",
  locale: "en_US",
  language: "en",
  author: {
    name: "David Cao",
    url: "https://yudavidcao.github.io",
    github: "https://github.com/YuDavidCao",
    linkedin: "https://www.linkedin.com/in/yu-david-cao/",
    medium: "https://medium.com/@yu.cao20041208",
  },
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href;
}

export function pageTitle(title: string, path: string): string {
  return path === "/" ? title : `${title} | ${SITE.name}`;
}
