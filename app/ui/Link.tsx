/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'

type CustomLinkProps = {
    href: string
}

const CustomLink = ({ href, ...rest }: CustomLinkProps) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  const ClassNameString = [
    'text-primary-600', 
    'hover:text-white-900', 
    'dark:text-pink-600', 
    'dark:hover:text-gray-300', 
    'no-underline', 
    'transition-colors',
    'duration-300',
    'font-bold',
    'hvr-bounce-to-top'
  ].join(' ')

  if (isInternalLink) {
    return (
      <Link href={href} className={ClassNameString} {...rest}></Link>
    )
  }

  return (
    <Link href={href} className={ClassNameString} rel="noopener noreferrer" target="_blank" {...rest}></Link>
  )

}

export default CustomLink
