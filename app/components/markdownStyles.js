import Link from "@/app/ui/Link";

function StyleH1({ children }) {
  return (
    <h1 className="text-4xl text-gray-900 mb-6 leading-tight tracking-tight dark:text-gray-100">
      {children}
    </h1>
  );
}

function StyleH2({ children }) {
  return (
    <h2 className="text-left text-2xl mb-4 font-bold text-gray-700 transition-colors duration-700 dark:text-gray-300">
      {children}
    </h2>
  );
}

function StyleP({ children }) {
  return (
    <p className="mb-4 text-lg text-gray-700 transition-colors duration-700 dark:text-gray-300">
      {children}
    </p>
  );
}

function StyleUL({ children }) {
  return (
    <ul className="list-disc list-inside mb-4 text-lg text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  );
}

function StyleLI({ children }) {
  return (
    <li className="mb-2">
      {children}
    </li>
  );
}

const MarkdownStyles = {
  h1: StyleH1,
  h2: StyleH2,
  p: StyleP,
  a: ({ href, children }) => <Link href={href}>{children}</Link>,
  ul: StyleUL,
  li: StyleLI,
};

export default MarkdownStyles;