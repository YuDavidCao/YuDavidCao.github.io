import { InlineCode } from "../../blogs/inline-code";
import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg = "/canonical-url-sharing-on-mobile-browsers-and-a-workaround-for-static-sites/hero.png";

export function CanonicalUrlSharingOnMobileBrowsersAndAWorkaroundForStaticSites() {
  return (
    <>
      <title>
        Canonical URL sharing on mobile browsers and a workaround for static
        sites
      </title>
      <meta
        name="description"
        content="Why mobile browsers share canonical URLs, the pros and cons, and a workaround for static sites to preserve user context when sharing links."
      />
      <meta
        property="og:title"
        content="Canonical URL sharing on mobile browsers and a workaround for static sites"
      />
      <meta
        property="og:description"
        content="Why mobile browsers share canonical URLs, the pros and cons, and a workaround for static sites to preserve user context when sharing links."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/canonical-url-sharing-on-mobile-browsers-and-a-workaround-for-static-sites"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Canonical URL sharing on mobile browsers and a workaround for static sites"
          date="June 6, 2025"
          heroImgSrc={heroImg}
          heroImgAlt="Canonical URL sharing on mobile browsers and a workaround for static sites Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            On mobile browsers like Safari and Chrome, sharing or bookmarking a
            page often uses the canonical URL instead of the current URL, which
            can strip query parameters and fragments that are important for
            users. This behavior, originally intended to help search engines,
            can cause confusion and loss of context for users sharing filtered
            or specific views of a page.
          </p>
          <p className="mb-4">
            The article explores why browsers do this, the pros and cons, and
            offers a workaround for static sites: dynamically updating the
            canonical link with JavaScript to reflect the current URL, ensuring
            shared links preserve user context. The post also summarizes browser
            behaviors and suggests that browsers could offer user-facing options
            for sharing canonical vs. current URLs.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Why do browsers share canonical URLs?
          </h2>
          <p className="mb-4">
            Canonical URLs were designed for search engines to identify the
            preferred version of a page, especially when there are duplicates
            with different query parameters. Around 2017, browsers started using
            canonical URLs for sharing/bookmarking, mainly to help users get the
            original article instead of AMP or cached versions. However, this
            general mechanism now affects all sites using{" "}
            <InlineCode>{'<link rel="canonical" />'}</InlineCode>.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Pros and cons for users
          </h2>
          <p className="mb-4">
            <strong>Pros:</strong> Strips tracking and unnecessary parameters,
            sometimes improving privacy. <br />
            <strong>Cons:</strong> Users may lose important context (filters,
            fragments, etc.) when sharing/bookmarking, leading to confusion or
            loss of intent.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Browser behavior summary
          </h2>
          <p className="mb-4">
            - Android: Chrome shares canonical (keeps fragment), Firefox/Samsung
            share original.
            <br />
            - iOS: Safari/Chrome/Edge share canonical (lose fragment), Firefox
            shares original.
            <br />- Desktop: Most share original URL.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Workaround for static sites
          </h2>
          <p className="mb-4">
            For static sites, you can use JavaScript to update the canonical
            link dynamically as the user navigates or changes filters. This
            ensures the canonical URL matches the current view, so
            sharing/bookmarking preserves the full context.
          </p>
          <CodeBlock
            language="javascript"
            code={`const canonical = document.querySelector('link[rel="canonical"]');\nif (canonical) {\n  canonical.href = window.location.href;\n}`}
          />
          <p className="mb-4">
            This approach is not perfect, but it helps mitigate the issue for
            static sites.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Conclusion
          </h2>
          <p className="mb-4">
            Mobile browsers' use of canonical URLs for sharing/bookmarking can
            be problematic for users. Developers can work around this on static
            sites, but ideally, browsers should offer users a choice between
            sharing the canonical or current URL.
          </p>
          <BlogFooter url="https://medium.com/@yu.cao20041208/canonical-url-sharing-on-mobile-browsers-and-a-workaround-for-static-sites-bab360d29835" />
        </article>
      </div>
    </>
  );
} 