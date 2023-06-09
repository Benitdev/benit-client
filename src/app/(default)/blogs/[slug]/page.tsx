import { notFound } from "next/navigation"

import { remark } from "remark"
import remarkToc from "remark-toc"

import postApi from "@/api/server-side/postApi"
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb"
import Heading from "@/components/common/Heading/Heading"
import Image from "next/image"
import "@/styles/customCkeditor.css"
import PostContent from "../_components/PostContent"
import Avatar from "@/components/ui/Avatar"
import { formatDateTime } from "@/utils/dayUtil"
import ButtonBack from "@/components/common/Button/ButtonBack"
import PostComment from "../_components/PostComment"
import Tag from "@/components/common/Tag/Tag"
import { IconHeartFilled, IconMessageCircle } from "@tabler/icons-react"
import PostFavorite from "../_components/PostFavorite"
import IncrementView from "../_components/IncrementView"
import { MDXRemote } from "next-mdx-remote/rsc"
import { CustomMDX } from "@/components/ui/MdxCustom"

type Props = {
  params: {
    slug: string
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await postApi.getPostDetail(params.slug)
  if (!post) notFound()

  async function main() {
    const file = await remark().use(remarkToc).process(post.content)

    return String(file)
  }

  const content = await main()
  // return (
  //   <div className="relative grid grid-cols-1 gap-4 p-2 lg:grid-cols-11 lg:p-6">
  //     <div className="ck col-span-8 space-y-6">
  //       <ButtonBack />
  //       <BreadCrumb
  //         segments={[
  //           {
  //             title: "Trang chủ",
  //             url: "/",
  //           },
  //           {
  //             title: "Bài viết",
  //             url: "/courses",
  //           },
  //           {
  //             title: post.title,
  //           },
  //         ]}
  //       />
  //       <Heading className="my-4 capitalize">{post.title}</Heading>
  //       <div className="flex items-end justify-between">
  //         <div className="flex w-fit items-center gap-2">
  //           <Avatar avatar={post.authorId.avatar} />
  //           <div className="flex flex-col justify-between">
  //             <span className="font-bold text-slate-400">
  //               {post.authorId.fullName}
  //             </span>
  //             <div className="space-x-2 text-sm">
  //               <time>{formatDateTime(post.createdAt)}</time>
  //               <span>🎉</span>
  //               <span>{post.readingTime} phút đọc</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="flex items-center gap-2 text-slate-400">
  //           <span className="flex items-center gap-2">
  //             {post.totalComment} <IconMessageCircle className="h-4 w-4" />
  //           </span>
  //           <span>|</span>
  //           <span className="flex items-center gap-2">
  //             {post.likes.length} <PostFavorite postId={post._id} />
  //           </span>
  //         </div>
  //       </div>
  //       <div className="relative h-[500px]">
  //         <Image
  //           src={post.image}
  //           alt={post.title}
  //           fill
  //           className="object-cover"
  //         />
  //       </div>
  //       {/* <PostContent content={post.content} /> */}
  //       <IncrementView postId={post._id} />
  //       <div className="flex flex-wrap gap-2">
  //         {post.tags.map((tag) => (
  //           <Tag key={tag._id} tag={tag} />
  //         ))}
  //       </div>
  //       {/* @ts-expect-error Async Server Component */}
  //       <PostComment postId={post._id} />
  //     </div>
  //     <div className="sticky top-[100px] col-span-3 h-[100px] rounded-xl bg-black/40 p-4 backdrop-blur-none">
  //       Nội dung bài viết
  //     </div>

  //     <div className="fixed left-11 top-[15%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/50 bg-gradient-to-tr blur-[200px]"></div>
  //     <div className="fixed bottom-[15%] right-11 -z-10 h-24 w-[40rem] rotate-45 bg-purple-600/60 bg-gradient-to-tr blur-[120px]"></div>
  //     <div className="bg-grid absolute inset-0 -z-10"></div>
  //   </div>
  // )
  console.log(content)
  return <CustomMDX source={content} />
}
