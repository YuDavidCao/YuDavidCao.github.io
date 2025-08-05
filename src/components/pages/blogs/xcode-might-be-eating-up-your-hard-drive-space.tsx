import { InlineCode } from "../../blogs/inline-code";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg = "/xcode-might-be-eating-up-your-hard-drive-space/hero.png";
const derivedData = "/xcode-might-be-eating-up-your-hard-drive-space/img1.png";

export function XcodeMightBeEatingUpYourHardDriveSpace() {
  return (
    <>
      <title>Xcode might be eating up your hard drive space!</title>
      <meta
        name="description"
        content="How Xcode's DerivedData can consume massive disk space on your Mac, how to find it, and how to reclaim your storage."
      />
      <meta
        property="og:title"
        content="Xcode might be eating up your hard drive space!"
      />
      <meta
        property="og:description"
        content="How Xcode's DerivedData can consume massive disk space on your Mac, how to find it, and how to reclaim your storage."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/xcode-might-be-eating-up-your-hard-drive-space"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Xcode might be eating up your hard drive space!"
          date="July 1, 2025"
          heroImgSrc={heroImg}
          heroImgAlt="Xcode might be eating up your hard drive space! Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            As a mobile developer, I primarily work with Flutter and most of my
            apps are iOS-focused. It's been about 8 months since I got my
            MacBook, and recently I noticed something strange: my 1TB hard drive
            only had around 80 GB of free space left.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Investigating the Mystery
          </h2>
          <p className="mb-4">
            I don't have any games installed, and my source code files shouldn't
            be taking up that much room. So what was hogging all my storage?
          </p>
          <p className="mb-4">
            Attempting to figure out what's been eating up my laptop storage, I
            tried to let the default setting app give me a quick rundown, but
            not surprisingly it is still evaluating the storage cost of
            different types of file (developer, system, document, etc).
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The Culprit: Xcode's DerivedData
          </h2>
          <p className="mb-4">
            After installing a disk explorer (not sponsored but this is a good
            tool ong), and ran a scan, the result is shocking:
          </p>
          <img
            src={derivedData}
            alt="DerivedData"
            className="w-full object-cover rounded-lg mb-6 shadow dark:shadow-gray-800"
            loading="lazy"
          />
          <p className="mb-4">
            Apparently, inside{" "}
            <InlineCode>~/Library/Developer/Xcode/DerivedData</InlineCode>,
            there's a folder called "DerivedData" which contains build caches
            and temp files that took up <strong>276 GB</strong> of my hard
            drive.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            How to Reclaim Your Space
          </h2>
          <p className="mb-4">
            I deleted the <InlineCode>DerivedData</InlineCode> folder, and just
            like that, I reclaimed 276 GB of space. No system issues, no errors
            in my projects—just a huge weight lifted off my SSD.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Takeaway
          </h2>
          <p className="mb-4">
            Mobile developers, watch out for Xcode! Don't let it quietly eat up
            all your storage. Check your <InlineCode>DerivedData</InlineCode>{" "}
            folder from time to time — you might be surprised by how much space
            it's using.
          </p>
          <BlogFooter url="https://medium.com/p/b7437cc880a5" />
        </article>
      </div>
    </>
  );
} 