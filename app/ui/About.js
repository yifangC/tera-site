import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function About() {
  // Read the MDX file
  const filePath = path.join(process.cwd(), "app", "content", "about.md");
  console.log(filePath);
  const fileContents = fs.readFileSync(filePath, "utf8");
  console.log(fileContents);
  // Serialize the content for MDX rendering
  const markdownSource = await serialize(fileContents);

  return <MDXRemote source={markdownSource} />;
}
