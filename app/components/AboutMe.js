import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import MarkdownStyles from "@/app/components/markdownStyles";

export default async function AboutSection() {
  const filePath = path.join(process.cwd(), "app", "content", "about.mdx"); 
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  return (
    <div className="prose dark:prose-dark">
      <MDXRemote source={content} components={MarkdownStyles} />
    </div>
  );
}
