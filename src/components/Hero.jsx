import wordmarkLarge from '../assets/images/wordmark-rei-kuremoto-large.svg'
import selfPortrait from '../assets/images/self-portrait.svg'
import MainCarousel from './MainCarousel'

export default function Hero({ onOpenProfile }) {
  return (
    <section className="relative flex flex-col justify-center px-6 py-12 md:px-16 md:py-16">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 flex-col items-start gap-1">
          <span className="text-lg font-medium md:text-5xl">hi, I&rsquo;m</span>
          <img
            src={wordmarkLarge}
            alt="rei kuremoto."
            className="h-auto w-full max-w-[420px] md:max-w-[800px]"
          />
        </div>
        <button
          type="button"
          onClick={onOpenProfile}
          aria-label="Open profile"
          className="hidden flex-none md:block"
        >
          <img
            src={selfPortrait}
            alt="Self-portrait illustration of rei kuremoto"
            className="h-auto w-[145px]"
          />
        </button>
      </div>

      <div className="mt-12 md:mt-16">
        <MainCarousel />
      </div>
    </section>
  )
}
