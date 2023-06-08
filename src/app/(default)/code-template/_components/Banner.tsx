import IconChat from "@/assets/icons/IconChat"
import IconFacebook from "@/assets/icons/IconFacebook"
import IconGithub from "@/assets/icons/IconGithub"
import IconPointer from "@/assets/icons/IconPointer"
import IconTiktok from "@/assets/icons/IconTiktok"
import IconWebsite from "@/assets/icons/IconWebsite"

const Banner = () => {
  return (
    <div className="select-none pb-10 pr-5 pt-10 text-slate-100">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center border-4 border-purple-500 bg-opacity-10 ">
        <div className="animate-ping">
          <IconPointer />
        </div>
      </div>
      <h1 className="bg-gradient-secondary mx-auto mb-10 max-w-xl bg-clip-text text-center text-3xl font-bold leading-snug text-transparent lg:text-4xl lg:leading-relaxed ">
        Get your free UI components with just few click
      </h1>
      {/*   <div className="mb-10 flex flex-col justify-center gap-5 sm:flex-row sm:items-center">
        <a
          href="https://github.com/Benitdev/client_benit_coding_ui"
          target="_blank"
          rel="noreferrer"
          className="button-effect inline-flex h-[60px] w-full items-center justify-center gap-x-3 rounded-lg bg-slate-800 px-8 py-4 font-sans font-semibold tracking-wide text-white sm:w-[230px]"
        >
          <IconGithub />
          View on Github
        </a>
        <a
          href="https://www.facebook.com/neihtben"
          target="_blank"
          className="bg-gradient-primary button-effect inline-flex h-[60px] w-full items-center justify-center gap-x-3 rounded-lg px-8 py-4 font-sans font-semibold tracking-wide text-white sm:w-[230px]"
          rel="noreferrer"
        >
          <IconChat />
          <span>Contact me</span>
        </a>
      </div>
      <div className="flex items-center justify-center gap-x-5">
        <SocialIcon href="https://www.facebook.com/neihtben">
          <IconFacebook />
        </SocialIcon>
        <SocialIcon href="https://www.youtube.com/@thienphan9714">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.6 16L14.4 13.6V18.4L18.6 16Z" fill="currentColor" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16ZM22.2 10.7C22.9 10.9 23.4 11.4 23.6 12.1C24 13.4 24 16 24 16C24 16 24 18.6 23.7 19.9C23.5 20.6 23 21.1 22.3 21.3C21 21.6 16 21.6 16 21.6C16 21.6 10.9 21.6 9.7 21.3C9 21.1 8.5 20.6 8.3 19.9C8 18.6 8 16 8 16C8 16 8 13.4 8.2 12.1C8.4 11.4 8.90001 10.9 9.60001 10.7C10.9 10.4 15.9 10.4 15.9 10.4C15.9 10.4 21 10.4 22.2 10.7Z"
              fill="currentColor"
            />
          </svg>
        </SocialIcon>
        <SocialIcon href="#">
          <IconTiktok />
        </SocialIcon>
        <SocialIcon href="#">
          <IconWebsite />
        </SocialIcon>
      </div> */}
    </div>
  )
}

function SocialIcon({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-700 p-1 text-white hover:opacity-70"
    >
      {children}
    </a>
  )
}

export default Banner
