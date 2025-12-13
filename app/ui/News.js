import Link from './Link'

export default function News() {
  return (
    <div className="text-gray-700 transition-colors duration-700 dark:text-gray-300">
      <h2 className="text-left text-2xl mb-4 font-bold text-gray-700 transition-colors duration-700 dark:text-gray-300">
        Recent news
      </h2>
      <div className="ml-4 grid auto-rows-fr text-lg">
        <div className="h-fill mt-2 mb-2 flex flex-row gap-4">
          <div className="... basis-1/4 font-bold"> Oct. 2023 </div>
          <div className="... basis-3/4 text-left align-middle">
            {' '}
            Our work on Intercontinental Long-Haul Links is appearing in{' '}
            {<Link href="https://dl.acm.org/sig/sigmetrics">SIGMETRICS</Link>}. Read the paper {<Link href="https://dl.acm.org/doi/abs/10.1145/3626778">here</Link>}!{' '}
          </div>
        </div>

        <div className="mt-2 mb-2 flex flex-row gap-4">
          <div className="... basis-1/4 font-bold"> Sep. 2023 </div>
          <div className="... basis-3/4 text-left align-middle">
            {' '}
            I will be attending{' '}
            {<Link href="https://conferences.sigcomm.org/sigcomm/2023/">SIGCOMM</Link>} this year.
            Feel free to say hi!{' '}
          </div>
        </div>

        <div className="mt-2 mb-2 flex flex-row gap-4">
          <div className="... basis-1/4 font-bold"> Dec. 2022 </div>
          <div className="... basis-3/4 text-left align-middle">
            {' '}
            Our work on Twitch's CDN mapping appears in{' '}
            {<Link href="https://dl.acm.org/doi/proceedings/10.1145/3570748">AINTEC</Link>}.
          </div>
        </div>

        <div className="mt-2 mb-2 flex flex-row gap-4">
          <div className="... basis-1/4 font-bold"> Sep. 2022 </div>
          <div className="... basis-3/4 text-left align-middle">
            {' '}
            Excited to start my Ph.D. journey at Northwestern University.{' '}
          </div>
        </div>
      </div>
    </div>
  )
}
