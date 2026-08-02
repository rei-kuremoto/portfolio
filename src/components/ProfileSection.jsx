import headingProfile from '../assets/images/heading-profile.svg'
import selfPortrait from '../assets/images/self-portrait.svg'
import { history, aboutMeParagraphs } from './profileContent'
import EmailCopyButton from './EmailCopyButton'

export default function ProfileSection() {
  return (
    <section className="bg-[#f8f8f8] md:hidden">
      <div className="flex items-center justify-between gap-6 px-6 py-10">
        <img src={headingProfile} alt="profile" className="h-auto w-[136px]" />
        <img
          src={selfPortrait}
          alt="Self-portrait illustration of rei kuremoto"
          className="h-auto w-[90px] flex-none"
        />
      </div>

      <div className="h-px w-full bg-[#1f1c1c]" />

      <div className="flex flex-col gap-4 px-6 py-10">
        <h3 className="font-mono text-xl font-medium">history</h3>
        <div className="flex flex-col gap-4 text-sm">
          {history.map((item) => (
            <div key={item.date} className="flex flex-col gap-1">
              <p>{item.date}</p>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-[#1f1c1c]" />

      <div className="flex flex-col gap-4 px-6 py-10">
        <h3 className="font-mono text-xl font-medium">about me</h3>
        <div className="flex flex-col gap-4 text-sm leading-[1.6]">
          {aboutMeParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-[#1f1c1c]" />

      <EmailCopyButton className="px-6 py-10" />
    </section>
  )
}
