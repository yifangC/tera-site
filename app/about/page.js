'use client'

import News from '@/app/ui/News'
import Link from '@/app/ui/Link'
import NextImage from 'next/image'
import { IconContext } from "react-icons"
import { MdEmail } from 'react-icons/md'
import { FaInstagram, FaLinkedin} from 'react-icons/fa'
import { TbBrandGithubFilled } from 'react-icons/tb' 

import { Courgette } from 'next/font/google'

const courgette = Courgette({
  subsets: ['latin'],
  weight: "400"
})

const name = 'Caleb J. Wang'
const occupation = 'CS Ph.D.' 
const company = 'Northwestern University' 

export default function Page() {
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
              <h3 className={`pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight text-gray-700 dark:text-gray-300 ${courgette.className}`}>{name}</h3>
              <div className="text-gray-700 dark:text-gray-300">{occupation} @ {company}</div>
              
              <div className="flex flex-row space-x-3 pt-6">
                <IconContext.Provider value={{ className: "social-icon" }}> 
                  <div>
                    <a href="mailto:caleb.wang@northwestern.edu" target="_blank"> <MdEmail /> </a>
                  </div>
                  <div>
                    <a href="https://github.com/theheokboi" rel="noopener noreferrer" target="_blank"> <TbBrandGithubFilled /> </a>
                  </div>
                  <div>
                    <a href="https://www.linkedin.com/in/hyes92121/" rel="noopener noreferrer" target="_blank"> <FaLinkedin /> </a>
                  </div>
                  <div>
                    <a href="https://www.instagram.com/the.heok.boi/" rel="noopener noreferrer" target="_blank"> <FaInstagram /> </a>
                  </div>
                </IconContext.Provider>
              </div>
            </div>
          </div>

          <div className="prose max-w-none pt-8 pb-2 dark:prose-dark xl:col-span-2">
            <h2 className="text-left text-2xl mb-4 font-bold text-gray-700 transition-colors duration-700 dark:text-gray-300">
              About me 
            </h2>
            <div className="mb-8 text-lg text-gray-700 transition-colors duration-700 dark:text-gray-300">
              <p className="mb-4 p">Hi there, welcome to my personal webpage.</p>
              <p className="mb-4 p ">My name is Caleb Wang, I'm a second year Ph.D. student in Computer Science at 
                <Link href="https://www.northwestern.edu"> Northwestern University</Link>, 
                where I work with Prof. <Link href="https://users.cs.northwestern.edu/~fabianb/"> Fabián E. Bustamante </Link> as a member in <Link href="https://aqualab.cs.northwestern.edu"> AquaLab</Link>.
                I received my Bachelor's degree in Electrical Engineering and Master's degree in Communication Engineering, both from <Link href="https://www.ntu.edu.tw/english/"> National Taiwan University</Link>.
                I worked briefly as a customer engineer at Microsoft, Taiwan before joining Northwestern in 2022.
              </p>
              <p className="mb-4 p">My research interest generally lies in Network Measurements, where I try to understand underlying characteristics of the Internet by measuring 
                and observing performance of the network. 
                Currently I am conducting a cross-layer analysis of network level measurements 
                and the infrastructure beneath to understand Internet consolidation at the physical level.
              </p>
              <p className="mb-4 p">During my spare time, you can find me brewing (decent) shots of espresso, banging my head against <Link href="https://www.youtube.com/watch?v=LTyxnUZMA1k"> music</Link>, 
                or writing unnecessarily complicated Javascript for simple websites like this one.</p>
            </div>
            { /* {children} */}
            <News />
          </div>
    
        </div>

      </div>
    )
  }