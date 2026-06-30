import { InlineCode } from "../../blogs/inline-code";
import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg =
  "/flutter-app-store-publishing-common-pitfalls-part-1/hero.png";

export function FlutterAppStorePublishingCommonPitfallsPart1() {
  return (
    <>
      <title>Flutter App Store Publishing: Common Pitfalls (Part 1)</title>
      <meta
        name="description"
        content="After publishing 100+ Flutter apps, these are the App Store rejection reasons I see most often — from missing Info.plist permissions to alpha-channel icons and mandatory login issues."
      />
      <meta
        property="og:title"
        content="Flutter App Store Publishing: Common Pitfalls (Part 1)"
      />
      <meta
        property="og:description"
        content="After publishing 100+ Flutter apps, these are the App Store rejection reasons I see most often — from missing Info.plist permissions to alpha-channel icons and mandatory login issues."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/flutter-app-store-publishing-common-pitfalls-part-1"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Flutter App Store Publishing: Common Pitfalls (Part 1)"
          date="June 28, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Flutter App Store Publishing Common Pitfalls Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            Publishing a Flutter app to the App Store sounds straightforward,
            until App Review rejects your build for something you've never even
            considered.
          </p>
          <p className="mb-4">
            Over the past few years, I've been involved in the publishing
            process of <strong>100+ Flutter applications</strong>. Some sailed
            through review in less than a day. Others took multiple iterations
            because of tiny configuration mistakes or App Store policies that
            weren't immediately obvious.
          </p>
          <p className="mb-4">
            This series isn't about Flutter development itself — it's about the
            issues that only appear once you press{" "}
            <strong>Submit for Review</strong>.
          </p>
          <p className="mb-4">
            In Part 1, I'll go over some of the most common and uncommon issues
            I've repeatedly encountered. TLDR below.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            TL;DR
          </h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Missing <InlineCode>Info.plist</InlineCode> permission strings (
              <InlineCode>NSCameraUsageDescription</InlineCode>,{" "}
              <InlineCode>NSPhotoLibraryUsageDescription</InlineCode>, etc.)
            </li>
            <li>
              App icons containing an alpha channel (use{" "}
              <InlineCode>remove_alpha_ios: true</InlineCode> with{" "}
              <InlineCode>flutter_launcher_icons</InlineCode>)
            </li>
            <li>
              Missing in-app <strong>Delete Account</strong> functionality for
              apps with user registration
            </li>
            <li>
              Special characters in <InlineCode>Info.plist</InlineCode> not
              being XML-escaped (e.g.{" "}
              <InlineCode>&</InlineCode> → <InlineCode>&amp;</InlineCode>)
            </li>
            <li>App Store screenshots showing Flutter's debug banner</li>
            <li>
              Mandatory login for features that Apple believes should be
              accessible without an account
            </li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            1. Missing Info.plist Permission Strings
          </h2>
          <p className="mb-4">
            This is by far one of the most common rejection reasons I see from
            first timers.
          </p>
          <p className="mb-4">
            If your app (or one of its dependencies) accesses protected system
            resources, iOS expects you to include a corresponding usage
            description in <InlineCode>Info.plist</InlineCode>.
          </p>
          <p className="mb-4">The two most common missing entries are:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <InlineCode>NSCameraUsageDescription</InlineCode>
            </li>
            <li>
              <InlineCode>NSPhotoLibraryUsageDescription</InlineCode>
            </li>
          </ul>
          <p className="mb-4">Other frequently required ones include:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <InlineCode>NSLocationAlwaysUsageDescription</InlineCode>
            </li>
            <li>
              <InlineCode>NSMicrophoneUsageDescription</InlineCode>
            </li>
          </ul>
          <p className="mb-4">
            A common source of confusion is that{" "}
            <strong>your own code might never request these permissions</strong>
            .
          </p>
          <p className="mb-4">
            Many Flutter plugins declare iOS permission requirements internally,
            and App Review may detect those capabilities even if they're only
            used in certain flows.
          </p>
          <p className="mb-4">
            Whenever you add a new plugin, double-check whether it requires an
            additional permission string.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            2. App Icon Contains Alpha Channel
          </h2>
          <p className="mb-4">
            This rejection usually catches first-time publishers by surprise.
          </p>
          <p className="mb-4">
            Apple requires iOS app icons to be completely opaque. If your icon
            contains any transparency — even a tiny amount — you'll receive a
            rejection similar to:
          </p>
          <blockquote className="border-l-4 border-sepia pl-4 italic mb-4">
            App Icons must not contain an alpha channel.
          </blockquote>
          <p className="mb-4">
            If you're using <InlineCode>flutter_launcher_icons</InlineCode>,
            the fix is fortunately simple:
          </p>
          <CodeBlock
            language="yaml"
            code={`flutter_launcher_icons:
  remove_alpha_ios: true`}
          />
          <p className="mb-4">Regenerate your icons and rebuild the app.</p>
          <p className="mb-4">
            It's a one-line fix, but one that's surprisingly easy to overlook.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            3. Missing "Delete Account" Functionality
          </h2>
          <p className="mb-4">
            This is one of Apple's strictest checks.
          </p>
          <p className="mb-4">
            If your app allows users to create an account, Apple expects users
            to also be able to delete that account directly within the app.
          </p>
          <p className="mb-4">Simply providing:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>an email address,</li>
            <li>customer support,</li>
            <li>or a website</li>
          </ul>
          <p className="mb-4">is generally not sufficient.</p>
          <p className="mb-4">
            App Review consistently flags this requirement, and in my
            experience, there's essentially no getting around it.
          </p>
          <p className="mb-4">
            If account registration exists, implement an in-app account deletion
            flow before submitting.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            4. Special Characters in Info.plist
          </h2>
          <p className="mb-4">
            This one is rare, but incredibly confusing when it happens.
          </p>
          <p className="mb-4">Suppose your app name is:</p>
          <CodeBlock language="text" code="Tom & Jerry" />
          <p className="mb-4">You might naturally write:</p>
          <CodeBlock
            language="xml"
            code={`<string>Tom & Jerry</string>`}
          />
          <p className="mb-4">Unfortunately, this is invalid XML.</p>
          <p className="mb-4">Instead, special characters must be escaped:</p>
          <CodeBlock
            language="xml"
            code={`<string>Tom &amp; Jerry</string>`}
          />
          <p className="mb-4">Other common XML escapes include:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <InlineCode>&amp;</InlineCode>
            </li>
            <li>
              <InlineCode>&lt;</InlineCode>
            </li>
            <li>
              <InlineCode>&gt;</InlineCode>
            </li>
            <li>
              <InlineCode>&quot;</InlineCode>
            </li>
            <li>
              <InlineCode>&apos;</InlineCode>
            </li>
          </ul>
          <p className="mb-4">
            Most developers never run into this issue, but when they do, the
            resulting errors often don't clearly point to the actual cause.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            5. Screenshots Showing the Flutter Debug Banner
          </h2>
          <p className="mb-4">
            This isn't an automatic rejection every time, but I've seen it
            happen.
          </p>
          <p className="mb-4">
            If your App Store screenshots display the red Flutter DEBUG banner,
            reviewers may consider the screenshots to be unprofessional or
            indicative of a development build.
          </p>
          <p className="mb-4">Before capturing screenshots:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Build a release version.</li>
            <li>Disable the debug banner.</li>
            <li>Double-check every uploaded screenshot.</li>
          </ul>
          <p className="mb-4">
            It's a small detail that can save an unnecessary review cycle.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            6. Mandatory Login When It Isn't Necessary
          </h2>
          <p className="mb-4">
            One of the more subtle review issues comes from Guideline 5.1.1.
          </p>
          <p className="mb-4">
            Apple may reject your app if users are forced to register before
            accessing features that aren't inherently account-specific.
          </p>
          <p className="mb-4">For example:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              An e-commerce app should allow users to browse products before
              signing in.
            </li>
            <li>
              A restaurant app should allow users to view the menu before
              creating an account.
            </li>
          </ul>
          <p className="mb-4">
            I've seen this guideline applied somewhat subjectively.
          </p>
          <p className="mb-4">
            Even if your application technically works better with
            authentication, App Review may determine that certain functionality
            should be publicly accessible before requiring registration.
          </p>
          <p className="mb-4">
            The tricky part is that there's no precise rule for where that line
            is.
          </p>
          <p className="mb-4">When designing your onboarding flow, ask yourself:</p>
          <blockquote className="border-l-4 border-sepia pl-4 italic mb-4">
            "Is the user being asked to create an account because it's
            genuinely required, or simply because it's more convenient for us
            as developers?"
          </blockquote>
          <p className="mb-4">
            That small distinction can determine whether your app gets approved
            on the first submission.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Final Thoughts
          </h2>
          <p className="mb-4">
            Most App Store rejections aren't caused by complicated bugs —
            they're caused by configuration mistakes, policy requirements, or
            small details that are easy to miss until you've published enough
            apps.
          </p>
          <p className="mb-4">
            After working through more than 100 Flutter app submissions, these
            are the issues I've seen come up repeatedly.
          </p>
          <p className="mb-4">
            In Part 2, I'll cover more uncommon rejection reasons, quirks, and
            some of the stranger issues that only surface after you've shipped a
            large number of apps.
          </p>
        </article>
        <BlogFooter url="https://medium.com/@yu.cao20041208/flutter-app-store-publishing-common-pitfalls-part-1-195e2713db2e" />
      </div>
    </>
  );
}
