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

// const ExperienceCard = ({ logo, company, position, years }) => {
//   return (
//     <div className="flex items-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-300">
//       {/* Company Logo */}
//       <div className="flex-shrink-0">
//         <img
//           src={logo}
//           alt={`${company} logo`}
//           className="h-20 w-20 object-contain"
//         />
//       </div>

//       {/* Company Info */}
//       <div className="flex flex-col">
//         <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
//           {company}
//         </h3>
//         <p className="text-sm text-gray-600 dark:text-gray-400">{position}</p>
//       </div>

//       {/* Years */}
//       <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
//         {years}
//       </div>
//     </div>
//   );
// };

const ExperienceCard = ({ logo, company, position, years }) => {
  return (
    <div>
      <div className="experience-entry mt-2 mb-4 grid grid-cols-[1fr,2fr]">
        <div className="flex items-start justify-center mt-0.5">
          <img
            src={logo}
            alt={`${company} logo`}
            className="h-20 w-20 object-contain"
          />
        </div>

        <div className="flex flex-col justify-between">
          <h3 className="mb-1 text-left font-bold text-gray-700 transition-colors duration-300 dark:text-gray-300">
            {" "}
            {company}{" "}
          </h3>
          <p className="mb-1 text-gray-700 dark:text-gray-300">{position}</p>
          <p className="italic text-gray-500 dark:text-gray-400">{years}</p>
        </div>
      </div>
      <div className="mt-4 mb-4 border-b border-gray-200 dark:border-gray-300"></div>
    </div>
  );
};

export default async function Experiences() {
  const filePath = path.join(
    process.cwd(),
    "app",
    "content",
    "experiences.mdx"
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  return (
    <div className="prose dark:prose-dark">
      <MDXRemote
        source={content}
        components={{ ...MarkdownStyles, ExperienceCard }}
      />
    </div>
  );
}
