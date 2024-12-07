'use client'

import { IconContext, MdEmail, FaInstagram, FaLinkedin, TbBrandGithubFilled, SiGooglescholar } from '@/app/icons'; 

export default function SocialIcons() {
  return (
    <IconContext.Provider value={{ className: "social-icon" }}>
      <div className="flex flex-row space-x-3 pt-6">
        <a href="mailto:caleb.wang@northwestern.edu" target="_blank"> <MdEmail /> </a>
        <a href="https://github.com/theheokboi" rel="noopener noreferrer" target="_blank"> <TbBrandGithubFilled /> </a>
        <a href="https://scholar.google.com/citations?user=w6xTbnUAAAAJ&hl=en" rel="noopener noreferrer" target="_blank"> <SiGooglescholar /> </a>
        <a href="https://www.linkedin.com/in/hyes92121/" rel="noopener noreferrer" target="_blank"> <FaLinkedin /> </a>
        <a href="https://www.instagram.com/the.heok.boi/" rel="noopener noreferrer" target="_blank"> <FaInstagram /> </a>
      </div>
    </IconContext.Provider>
  );
}