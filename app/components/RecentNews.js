import React from "react";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import MarkdownStyles from "@/app/components/markdownStyles";

function NewsItem({ date, children }) {
    return (
        <div className="h-fill mt-2 mb-2 flex flex-row gap-4">
          {/* Date Section */}
          <div className="basis-1/4 text-lg font-bold text-gray-700 transition-colors duration-700 dark:text-gray-300">{date}</div>
          
          {/* Content Section */}
          <div className="basis-3/4 text-left align-middle">
            {children}
          </div>
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
        components={{...MarkdownStyles, NewsItem}} 
      />
    </div>
  );
}

