import Image from "next/image"
import Link from "next/link"

type Props = {}

function Footer({}: Props) {
  return (
    <footer className="border-t border-slate-200/30 pt-10">
      <div className="container mx-auto grid grid-cols-list gap-8 pb-8 text-slate-400 ">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Chính sách & Điều khoản
          </h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                title="Chính sách bảo mật"
                className="hover:text-slate-900 dark:hover:text-slate-300"
                href="/chinh-sach-bao-mat"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a
                title="Điều khoản"
                className="hover:text-slate-900 dark:hover:text-slate-300"
                href="/dieu-khoan"
              >
                Điều khoản
              </a>
            </li>
            <li>
              <a
                title="Điều khoản"
                className="hover:text-slate-900 dark:hover:text-slate-300"
                href="/rss/feed.xml"
              >
                RSS Feed
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Sản phẩm
          </h2>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                title="Khóa học"
                target="_blank"
                className="hover:text-slate-900 dark:hover:text-slate-300"
                href="/courses"
              >
                Khóa học
              </Link>
            </li>
            <li>
              <Link
                title="Bài viết"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-slate-300"
                href="/blogs"
              >
                Bài viết
              </Link>
            </li>
            <li>
              <a
                title="Ebook thôi miên nhà tuyển dụng bằng nghệ thuật ngôn từ"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-slate-300"
                href="/blog/ebook-thoi-mien-nha-tuyen-dung"
              >
                Ebook thôi miên nhà tuyển dụng
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Hệ sinh thái
          </h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                title="Facebook của Dư Thanh Được"
                href="https://www.facebook.com/duthanhduoc"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-slate-300"
              >
                Facebook của Benit
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@duocdev"
                title="Youtube Được Dev"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-slate-300"
              >
                Youtube Benit
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@duocdev"
                title="Tiktok Được Dev"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-slate-300"
              >
                Tiktok Benit
              </a>
            </li>
            <li>
              <a
                href="https://github.com/duthanhduoc"
                title="Github Dư Thanh Được"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-slate-300"
              >
                Github
              </a>
            </li>

            {/*   <li>
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100089384947080%2F&amp;tabs=timeline&amp;small_header=true&amp;adapt_container_width=true&amp;hide_cover=true&amp;show_facepile=true&amp;lazy=true&amp;appId=4141921005896499"
                className="overflow-hidden border-none"
                width="100%"
                height="250"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </li> */}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            Giới thiệu
          </h2>
          <p className="mt-3">
            Phát triển bởi Benit vào năm 2023, là blog cá nhân chia sẻ kiến thức
            IT, Marketing và cung cấp các khóa học chất lượng giúp mọi người
            level up kỹ năng của bản thân nhanh nhất.
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-16 border-t border-t-slate-500/50 py-10">
        <p className="mb-8 text-center text-sm">
          Copyright © 2023 by <Link href="/">Benit</Link>
        </p>
        <div className="flex items-center justify-center">
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noreferrer"
            title="Tailwindcss"
            className="mr-4"
          >
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>TailwindCSS</title>
              <path
                d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z"
                className="fill-cyan-500 dark:fill-cyan-400"
              ></path>
            </svg>
          </a>
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer"
            title="Nextjs"
            className="mr-4"
          >
            <svg
              height="32"
              viewBox="0 0 148 90"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <title>NextJS</title>
              <path
                d="M34.992 23.495h27.855v2.219H37.546v16.699h23.792v2.219H37.546v18.334h25.591v2.219H34.992v-41.69zm30.35 0h2.96l13.115 18.334 13.405-18.334L113.055.207 83.1 43.756l15.436 21.429H95.46L81.417 45.683 67.316 65.185h-3.018L79.85 43.756 65.343 23.495zm34.297 2.219v-2.219h31.742v2.219h-14.623v39.47h-2.554v-39.47H99.64zM.145 23.495h3.192l44.011 66.003L29.16 65.185 2.814 26.648l-.116 38.537H.145v-41.69zm130.98 38.801c-.523 0-.914-.405-.914-.928 0-.524.391-.929.913-.929.528 0 .913.405.913.929 0 .523-.385.928-.913.928zm2.508-2.443H135c.019.742.56 1.24 1.354 1.24.888 0 1.391-.535 1.391-1.539v-6.356h1.391v6.362c0 1.808-1.043 2.849-2.77 2.849-1.62 0-2.732-1.01-2.732-2.556zm7.322-.08h1.379c.118.853.95 1.395 2.149 1.395 1.117 0 1.937-.58 1.937-1.377 0-.685-.521-1.097-1.708-1.377l-1.155-.28c-1.62-.38-2.36-1.166-2.36-2.487 0-1.602 1.304-2.668 3.26-2.668 1.82 0 3.15 1.066 3.23 2.58h-1.354c-.13-.828-.85-1.346-1.894-1.346-1.1 0-1.832.53-1.832 1.34 0 .642.472 1.01 1.64 1.284l.987.243c1.838.43 2.596 1.178 2.596 2.53 0 1.72-1.33 2.799-3.453 2.799-1.987 0-3.323-1.029-3.422-2.637z"
                fill="currentColor"
                fillRule="nonzero"
              ></path>
            </svg>
          </a>
          <a
            target="_blank"
            title="DMCA.com Protection Status"
            className="dmca-badge"
            href="http://www.dmca.com/Protection/Status.aspx?ID=953673e8-5954-4378-ace0-2538d601e749&amp;refurl=https://duthanhduoc.com/"
          >
            <Image
              src="https://images.dmca.com/Badges/dmca_protected_sml_120c.png?ID=953673e8-5954-4378-ace0-2538d601e749"
              alt="DMCA.com Protection Status"
              width={100}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
