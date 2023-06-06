import postApi from "@/api/server-side/postApi"
import PostItem from "./PostItem"
import { TUser } from "@/types"

type Props = {
  categoryId?: string
  feature?: string
  type?: "my-blogs" | "blogs"
  user?: TUser
}
const PostList = async ({
  categoryId = "",
  feature = "",
  type,
  user,
}: Props) => {
  const posts = await postApi.getPost({
    categoryId,
    feature,
    authorId: type === "my-blogs" ? user?._id : "",
  })
  return (
    <ol className="relative mt-8 border-l border-gray-200 pr-10 dark:border-gray-700 md:ml-20 lg:ml-40 lg:pr-16">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </ol>
  )
}

export default PostList
