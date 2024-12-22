import React from "react";

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

const DateBadge = ({ date }) => {
  const bgStyles = "bg-primary-600 text-white dark:bg-pink-600 dark:text-gray-300";  
  const fontStyles = `font-bold text-md ${rubik.className}`;
  const spacingStyles = "px-4 py-0.5 rounded";
  const layoutStyles = "mr-4 mt-1";
  const shadowStyles = "shadow-lg shadow-gray-500/70 hover:shadow-xl hover:shadow-gray-500/90 transition-shadow duration-300";

  const combinedClassName = `${bgStyles} ${fontStyles} ${spacingStyles} ${layoutStyles} ${shadowStyles}`; 

  return date ? <div className={combinedClassName}>{date}</div> : null;
};


function NewsItem({ date, children }) {
  return (
    <div className="h-fill mt-2 mb-2 flex flex-row gap-4 items-start">
      {/* Date Section */}
      {/* <div className="basis-1/4 text-lg font-bold text-gray-700 transition-colors duration-700 dark:text-gray-300">{date}</div> */}
      <DateBadge date={date} />

      {/* Content Section */}
      <div className="basis-3/4 text-left align-middle">{children}</div>
    </div>
  );
}

export default async function RecentNews() {
  const filePath = path.join(
    process.cwd(),
    "app",
    "content",
    "recent_news.mdx"
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  return (
    <div className="prose dark:prose-dark">
      <MDXRemote
        source={content}
        components={{ ...MarkdownStyles, NewsItem }}
      />
    </div>
  );
}
