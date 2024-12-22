import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

import MarkdownStyles from "@/app/components/markdownStyles";

import { Rubik } from "next/font/google";

// Configure the font
const rubik = Rubik({
  subsets: ["latin"], // Specify subsets like 'latin', 'cyrillic', etc.
  weight: ["400", "500", "700"], // Optional: Include specific weights
  variable: "--font-rubik", // Optional: Custom CSS variable for font
});

const CustomAnchorLink = ({ text, link }) => {
  const borderStyles =
    "border border-solid border-2 border-primary-600 dark:border-pink-600";
  const textStyles = "text-primary-600 dark:text-pink-600";
  const spacingStyles = "px-4 rounded";
  const transitionStyles = "transition-colors duration-300";
  const hoverStyles =
    "hover:bg-primary-600 dark:hover:bg-pink-600 hover:text-white dark:hover:text-gray-300";
  const utilityStyles = "no-underline";

  const combinedClassName = `${borderStyles} ${textStyles} ${spacingStyles} ${transitionStyles} ${hoverStyles} ${utilityStyles}`;

  return (
    <a href={link} className={combinedClassName}>
      {text}
    </a>
  );
};

const ConferenceBadge = ({ conference }) => {
  const bgStyles = "bg-primary-600 text-white dark:bg-pink-600 dark:text-gray-300"; 
  const fontStyles = `font-bold text-sm ${rubik.className}`;
  const spacingStyles = "px-4 py-0.5 rounded";
  const layoutStyles = "mr-4";
  const shadowStyles = "shadow-lg shadow-gray-500/70 hover:shadow-xl hover:shadow-gray-500/90 transition-shadow duration-300";

  const combinedClassName = `${bgStyles} ${fontStyles} ${spacingStyles} ${layoutStyles} ${shadowStyles}`; 

  return conference ? (
    <div className={combinedClassName}>{conference}</div>
  ) : null;
};

const PublicationEntry = ({
  title,
  conference,
  conferenceFullName,
  authors,
  components,
  highlightAuthors = [],
}) => {
  return (
    <div className="publication-entry mt-12 mb-12 grid grid-cols-[1fr,3fr] gap-4">
      {/* Conference Badge */}
      <div className="flex items-start mt-0.5">
        <ConferenceBadge conference={conference} />
      </div>

      {/* Publication Details */}
      <div className="flex flex-col justify-between">
        <h3 className="mb-1 text-left font-bold text-gray-700 transition-colors duration-300 dark:text-gray-300"> 
          {title}
        </h3>

        <p className="mb-1 text-gray-700 dark:text-gray-300">
          {authors.map((author, index) => (
            <span key={index}>
              {highlightAuthors.includes(author) ? (
                <span className="underline">{author}</span>
              ) : (
                author
              )}
              {index < authors.length - 1 && ", "}
            </span>
          ))}
        </p>

        <p className="italic text-gray-500 dark:text-gray-400">
          {conferenceFullName}
        </p>

        <div className="flex flex-row space-x-3 pt-4">
          {components.map((component, index) => (
            <CustomAnchorLink
              key={index}
              text={component.title}
              link={component.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default async function Publications() {
  const filePath = path.join(
    process.cwd(),
    "app",
    "content",
    "publications.mdx"
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  return (
    <div className="prose dark:prose-dark">
      <MDXRemote
        source={content}
        components={{ ...MarkdownStyles, PublicationEntry }}
      />
    </div>
  );
}
