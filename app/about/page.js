import RemoteMdxPage from "@/app/mdtest/page";

import NextImage from "next/image";
import { Courgette, Quicksand } from "next/font/google";

import News from "@/app/ui/News";
import Link from "@/app/ui/Link";
import SocialIcons from "@/app/ui/SocialIcons";

const courgette = Courgette({
  subsets: ["latin"],
  weight: "400",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: "400",
});

const name = "Caleb J. Wang";

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
            {/* <h3
              className={`pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight text-gray-700 dark:text-gray-300 ${courgette.className}`}
            >
              {name}
            </h3> */}
            <div className={`pt-4 pb-2 text-xl text-gray-700 dark:text-gray-300 ${quicksand.className}`}>
              Room 3416 @ Seeley G. Mudd
              Evanston, IL, 60208
            </div>

            <div className="flex flex-row space-x-3 pt-6">
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="prose max-w-none pt-8 pb-2 dark:prose-dark xl:col-span-2">
          {/* <h2 className="text-left text-2xl mb-4 font-bold text-gray-700 transition-colors duration-700 dark:text-gray-300">
            About me
          </h2>
          <div className="mb-8 text-lg text-gray-700 transition-colors duration-700 dark:text-gray-300">
            <p className="mb-4 p">Hi there, welcome to my personal webpage.</p>
            <p className="mb-4 p ">
              My name is Caleb Wang, I'm a second year Ph.D. student in Computer
              Science at
              <Link href="https://www.northwestern.edu">
                {" "}
                Northwestern University
              </Link>
              , where I work with Prof.{" "}
              <Link href="https://users.cs.northwestern.edu/~fabianb/">
                {" "}
                Fabián E. Bustamante{" "}
              </Link>{" "}
              as a member in{" "}
              <Link href="https://aqualab.cs.northwestern.edu"> AquaLab</Link>.
              I received my Bachelor's degree in Electrical Engineering and
              Master's degree in Communication Engineering, both from{" "}
              <Link href="https://www.ntu.edu.tw/english/">
                {" "}
                National Taiwan University
              </Link>
              . I worked briefly as a customer engineer at Microsoft, Taiwan
              before joining Northwestern in 2022.
            </p>
            <p className="mb-4 p">
              My research interest generally lies in Network Measurements, where
              I try to understand underlying characteristics of the Internet by
              measuring and observing performance of the network. Currently I am
              conducting a cross-layer analysis of network level measurements
              and the infrastructure beneath to understand Internet
              consolidation at the physical level.
            </p>
            <p className="mb-4 p">
              During my spare time, you can find me brewing (decent) shots of
              espresso, banging my head against{" "}
              <Link href="https://www.youtube.com/watch?v=LTyxnUZMA1k">
                {" "}
                music
              </Link>
              , or writing unnecessarily complicated Javascript for simple
              websites like this one.
            </p>
          </div> */}

          <RemoteMdxPage />

          <News />
        </div>
      </div>
    </div>
  );
}
