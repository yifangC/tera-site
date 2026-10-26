import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { TbBrandGithubFilled } from 'react-icons/tb';
import { SiGooglescholar } from 'react-icons/si';
import type { Site } from '@/lib/content/schemas';

const icons = {
  email: MdEmail,
  github: TbBrandGithubFilled,
  linkedin: FaLinkedin,
  scholar: SiGooglescholar,
  instagram: FaInstagram,
};

export default function SocialLinks({ links }: { links: Site['socials'] }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 pt-18">
      {links.map(({ label, href, icon }) => {
        const Icon = icons[icon];
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Icon aria-hidden className="social-icon" />
          </a>
        );
      })}
    </div>
  );
}
