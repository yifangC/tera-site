// import siteMetadata from '@/data/siteMetadata'

const siteMetadata = {
  author: 'Caleb J. Wang' 
}

const getGreetingMessage = () => {
  const dayNameList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] 
  const timeList    = ['morning', 'afternoon', 'evening', 'night']

  const date = new Date() 
  const dayName = dayNameList[date.getDay()] 
  const hours = date.getHours() 
  let timeName = '' 

  if (0 < hours && hours < 11) {
    timeName = 'morning'
  } else if (11 < hours && hours < 17) {
    timeName = 'afternoon'
  } else if (17 < hours && hours < 20) {
    timeName = 'evening'
  } else {
    timeName = 'night'
  }

  return `Have a good ${dayName} ${timeName}!`
}


export default function Footer() {
  return (
    <footer>
      <div className="mt-16 mb-8 flex flex-col items-center">
        <div className="mb-2 flex space-x-2 text-sm text-gray-700 dark:text-gray-300 transition-all duration-700">
          <div>{`${siteMetadata.author}`}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <div className="hover:text-primary-600 dark:hover:text-pink-600 group-hover:max-w-full hover:duration-700">{getGreetingMessage()}</div>
        </div>
      </div>
    </footer>
  )
}
