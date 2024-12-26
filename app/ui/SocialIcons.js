"use client";

import {
  IconContext,
  MdEmail,
  FaInstagram,
  FaLinkedin,
  TbBrandGithubFilled,
  SiGooglescholar,
} from "@/app/icons";

export default function SocialIcons() {
  return (
    <IconContext.Provider value={{ className: "social-icon" }}>
      <div className="flex flex-row space-x-3 pt-6">
        <a href="mailto:cheng627@purdue.edu" target="_blank">
          {" "}
          <MdEmail />{" "}
        </a>
        <a
          href="https://github.com/yifangC"
          rel="noopener noreferrer"
          target="_blank"
        >
          {" "}
          <TbBrandGithubFilled />{" "}
        </a>
        <a href="" rel="noopener noreferrer" target="_blank">
          {" "}
          <SiGooglescholar />{" "}
        </a>
        <a
          href="https://www.linkedin.com/in/yifangchengg/"
          rel="noopener noreferrer"
          target="_blank"
        >
          {" "}
          <FaLinkedin />{" "}
        </a>
        {/* <a href="https://www.instagram.com/the.heok.boi/" rel="noopener noreferrer" target="_blank"> <FaInstagram /> </a> */}
      </div>
    </IconContext.Provider>
  );
}
