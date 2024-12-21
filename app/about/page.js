import AboutSection from "@/app/components/AboutMe";
import RecentNews from "@/app/components/RecentNews";

import NextImage from "next/image";
import { Quicksand } from "next/font/google";

// import News from "@/app/ui/News";
import SocialIcons from "@/app/ui/SocialIcons";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: "400",
});

export default async function Page() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8">
          <NextImage
            className="h-64 w-64"
            src={"/static/images/headshot.jpg"}
            width={256}
            height={256}
          />
          <div className="flex flex-col items-center">
            <div
              className={`pt-4 pb-2 text-xl text-gray-700 dark:text-gray-300 ${quicksand.className}`}
            >
              Room 3416 @ Seeley G. Mudd Evanston, IL, 60208
            </div>

            <div className="flex flex-row space-x-3 pt-6">
              <SocialIcons />
            </div>
          </div>
        </div>

        {/* Start of main content */}
        <div className="prose max-w-none pt-8 pb-2 dark:prose-dark xl:col-span-2">
          <AboutSection />
          <RecentNews />
        </div>
        {/* End of main content */}
      </div>
    </div>
  );
}
