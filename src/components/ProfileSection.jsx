import headingProfile from '../assets/images/heading-profile.svg'
import selfPortrait from '../assets/images/self-portrait.svg'
import { history, aboutMeParagraphs } from './profileContent'
import EmailCopyButton from './EmailCopyButton'

export default function ProfileSection() {
  return (
    <section>
      <div className="flex items-center justify-between gap-6 py-10 md:pt-0 md:pb-16">
        <img src={headingProfile} alt="profile" className="h-auto w-[136px] md:w-[208px]" />
        <img
          src={selfPortrait}
          alt="Self-portrait illustration of rei kuremoto"
          className="h-auto w-[90px] flex-none md:w-[145px]"
        />
      </div>

      <div className="flex flex-col gap-4 py-10">
        <h3 className="font-mono text-xl font-medium md:text-2xl">history</h3>
        <div className="flex flex-col gap-4 text-sm">
          {history.map((item) => (
            <div key={item.date} className="flex flex-col gap-1 md:flex-row md:justify-between md:gap-4">
              <p>{item.date}</p>
              <p className="md:text-right">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 py-10">
        <h3 className="font-mono text-xl font-medium md:text-2xl">about me</h3>
        <div className="flex flex-col gap-4 text-sm leading-[1.6]">
          {aboutMeParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <EmailCopyButton className="py-10" />
    </section>
  )
}
