import{j as e,a}from"./index-SyEhgdtT.js";import{I as t}from"./inline-code-DwHVTRgA.js";import{C as o}from"./code-block-bL3gIvBm.js";import{B as i,a as r}from"./blog-content-DYQd5OcZ.js";try{let n=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},s=new n.Error().stack;s&&(n._sentryDebugIds=n._sentryDebugIds||{},n._sentryDebugIds[s]="4043c0d6-4c6f-416c-b28c-1d59ba72c99c",n._sentryDebugIdIdentifier="sentry-dbid-4043c0d6-4c6f-416c-b28c-1d59ba72c99c")}catch{}function h(){return e.jsxs(e.Fragment,{children:[e.jsx("title",{children:"Write clean Flutter code with extension methods"}),e.jsx("meta",{name:"description",content:"Learn how to use extension methods in Flutter to write cleaner, more maintainable code with practical examples."}),e.jsx("meta",{property:"og:title",content:"Write clean Flutter code with extension methods"}),e.jsx("meta",{property:"og:description",content:"Learn how to use extension methods in Flutter to write cleaner, more maintainable code with practical examples."}),e.jsx("link",{rel:"canonical",href:"https://yudavidcao.github.io/blog/write-clean-flutter-code-with-extension-methods"}),e.jsxs("div",{className:"w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary",children:[e.jsx(i,{title:"Write clean Flutter code with extension methods",date:"June 12, 2024",heroImgSrc:a,heroImgAlt:"Write clean Flutter code with extension methods Hero"}),e.jsxs("article",{className:"prose prose-lg max-w-none font-sans dark:prose-invert",children:[e.jsxs("p",{className:"mb-4",children:["Have you ever encountered a situation where the Flutter implementation of a class just lacks some stuff? For instance, imagine you only want the year, month, and day information from a"," ",e.jsx(t,{children:"DateTime"})," object. Your first instinct might be to check for an existing function on the"," ",e.jsx(t,{children:"DateTime"})," class, but sadly, it doesn't exist. Here's what you would typically have to do:"]}),e.jsx(o,{language:"dart",code:`void main() {
  DateTime now = DateTime.now();
  print(DateTime(now.year, now.month, now.day));
}`}),e.jsx("p",{className:"mb-4",children:"Pretty tedious and ugly right? Don't worry, extension got you covered:"}),e.jsx(o,{language:"dart",code:`void main() {
  DateTime now = DateTime.now();
  print(now.getDateOnly());
}

extension DateOnly on DateTime {
  DateTime getDateOnly() {
    return DateTime(this.year, this.month, this.day);
  }
}`}),e.jsxs("p",{className:"mb-4",children:["With the ",e.jsx(t,{children:"DateOnly"})," extension, if you have a"," ",e.jsx(t,{children:"DateTime"})," object and you only want the date information, just call the ",e.jsx(t,{children:".getDateOnly()"})," ","method."]}),e.jsxs("p",{className:"mb-4",children:[e.jsx("strong",{children:"How Does Extension Work?"}),e.jsx("br",{}),"Extension allows us to add on additional method to an existing class without modifying the original source code file. Extensions can define not just methods, but also other members such as getter, setters, and operators."]}),e.jsx("blockquote",{className:"mb-4",children:"Note: adding new non-static class variables are forbidden"}),e.jsx("p",{className:"mb-4",children:"Here's the syntax:"}),e.jsx(o,{language:"dart",code:`extension SomeExtension on TargetedClass {
  ReturnType someMethod(){
    doSomething
  }
}`}),e.jsx("h2",{className:"font-serif text-3xl font-bold mt-10 mb-4 tracking-tight",children:"More Useful Examples on Extension"}),e.jsx("p",{className:"mb-4",children:e.jsx("strong",{children:"Capitalize the first letter of a string:"})}),e.jsx(o,{language:"dart",code:`extension Capitalize on String {
    String capitalize() {
      return "\${this[0].toUpperCase()}\${this.substring(1).toLowerCase()}";
    }
}`}),e.jsx("p",{className:"mb-4",children:e.jsx("strong",{children:"Make an existing color lighter:"})}),e.jsx(o,{language:"dart",code:`extension Lighten on Color {
  Color lighten([double amount = .1]) {
    assert(amount >= 0 && amount <= 1);
    final hsl = HSLColor.fromColor(this);
    final hslLight =
        hsl.withLightness((hsl.lightness + amount).clamp(0.0, 1.0));

    return hslLight.toColor();
  }
}`}),e.jsxs("p",{className:"mb-4",children:["These are just a few examples. There are multiple extension packages available online for common use cases like"," ",e.jsx(t,{children:"isEmail"}),", ",e.jsx(t,{children:"isToday"}),","," ",e.jsx(t,{children:"isSameWeek"}),", and more. Remember, you can always create your own extension methods based on your needs."]}),e.jsx("p",{className:"mb-4",children:"The official documentation on extension methods can be found here."}),e.jsx("p",{className:"mb-4",children:"Hopefully, you learned something new! Happy coding!"}),e.jsx(r,{url:"https://medium.com/p/cd1cc9e52a8a"})]})]})]})}export{h as WriteCleanFlutterCodeWithExtensionMethods};
//# sourceMappingURL=write-clean-flutter-code-with-extension-methods-DKYCX6iL.js.map
