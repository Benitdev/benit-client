import Image from "next/image"
import Link from "next/link"

import Heading from "../common/Heading"
import postApi from "@/api/server-side/postApi"
import PostItem from "./PostItem"

const PostList = async () => {
  const posts = await postApi.getPost()
  return (
    <div className="relative p-10">
      <Heading>Bài viết nổi bật</Heading>
      <ol className="relative mx-10 ml-20 mt-8 border-l border-gray-200 dark:border-gray-700 lg:ml-40">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ol>
      <div className="absolute left-11 top-[50%] -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/70 bg-gradient-to-tr blur-[200px]"></div>
    </div>
  )
}

export default PostList
