import postApi from "@/api/server-side/postApi"
import PostItem from "./PostItem"

const PostList = async () => {
  const posts = await postApi.getPost()
  return (
    <ol className="relative mt-8 border-l border-gray-200 pr-10 dark:border-gray-700 md:ml-20 lg:ml-40 lg:pr-16">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </ol>
  )
}

export default PostList
