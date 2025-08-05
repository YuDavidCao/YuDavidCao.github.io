import { InlineCode } from "../../blogs/inline-code";
import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg = "/write-clean-flutter-code-with-extension-methods/hero.png";

export function WriteCleanFlutterCodeWithExtensionMethods() {
  return (
    <>
      <title>Write clean Flutter code with extension methods</title>
      <meta
        name="description"
        content="Learn how to use extension methods in Flutter to write cleaner, more maintainable code with practical examples."
      />
      <meta
        property="og:title"
        content="Write clean Flutter code with extension methods"
      />
      <meta
        property="og:description"
        content="Learn how to use extension methods in Flutter to write cleaner, more maintainable code with practical examples."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/write-clean-flutter-code-with-extension-methods"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Write clean Flutter code with extension methods"
          date="June 12, 2024"
          heroImgSrc={heroImg}
          heroImgAlt="Write clean Flutter code with extension methods Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            Have you ever encountered a situation where the Flutter
            implementation of a class just lacks some stuff? For instance,
            imagine you only want the year, month, and day information from a{" "}
            <InlineCode>DateTime</InlineCode> object. Your first instinct might
            be to check for an existing function on the{" "}
            <InlineCode>DateTime</InlineCode> class, but sadly, it doesn't
            exist. Here's what you would typically have to do:
          </p>
          <CodeBlock
            language="dart"
            code={`void main() {\n  DateTime now = DateTime.now();\n  print(DateTime(now.year, now.month, now.day));\n}`}
          />
          <p className="mb-4">
            Pretty tedious and ugly right? Don't worry, extension got you
            covered:
          </p>
          <CodeBlock
            language="dart"
            code={`void main() {\n  DateTime now = DateTime.now();\n  print(now.getDateOnly());\n}\n\nextension DateOnly on DateTime {\n  DateTime getDateOnly() {\n    return DateTime(this.year, this.month, this.day);\n  }\n}`}
          />
          <p className="mb-4">
            With the <InlineCode>DateOnly</InlineCode> extension, if you have a{" "}
            <InlineCode>DateTime</InlineCode> object and you only want the date
            information, just call the <InlineCode>.getDateOnly()</InlineCode>{" "}
            method.
          </p>
          <p className="mb-4">
            <strong>How Does Extension Work?</strong>
            <br />
            Extension allows us to add on additional method to an existing class
            without modifying the original source code file. Extensions can
            define not just methods, but also other members such as getter,
            setters, and operators.
          </p>
          <blockquote className="mb-4">
            Note: adding new non-static class variables are forbidden
          </blockquote>
          <p className="mb-4">Here's the syntax:</p>
          <CodeBlock
            language="dart"
            code={`extension SomeExtension on TargetedClass {\n  ReturnType someMethod(){\n    doSomething\n  }\n}`}
          />
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            More Useful Examples on Extension
          </h2>
          <p className="mb-4">
            <strong>Capitalize the first letter of a string:</strong>
          </p>
          <CodeBlock
            language="dart"
            code={`extension Capitalize on String {\n    String capitalize() {\n      return "\${this[0].toUpperCase()}\${this.substring(1).toLowerCase()}";\n    }\n}`}
          />
          <p className="mb-4">
            <strong>Make an existing color lighter:</strong>
          </p>
          <CodeBlock
            language="dart"
            code={`extension Lighten on Color {\n  Color lighten([double amount = .1]) {\n    assert(amount >= 0 && amount <= 1);\n    final hsl = HSLColor.fromColor(this);\n    final hslLight =\n        hsl.withLightness((hsl.lightness + amount).clamp(0.0, 1.0));\n\n    return hslLight.toColor();\n  }\n}`}
          />
          <p className="mb-4">
            These are just a few examples. There are multiple extension packages
            available online for common use cases like{" "}
            <InlineCode>isEmail</InlineCode>, <InlineCode>isToday</InlineCode>,{" "}
            <InlineCode>isSameWeek</InlineCode>, and more. Remember, you can
            always create your own extension methods based on your needs.
          </p>
          <p className="mb-4">
            The official documentation on extension methods can be found here.
          </p>
          <p className="mb-4">
            Hopefully, you learned something new! Happy coding!
          </p>
          <BlogFooter url="https://medium.com/p/cd1cc9e52a8a" />
        </article>
      </div>
    </>
  );
}
