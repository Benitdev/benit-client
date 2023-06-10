import postApi from "@/api/server-side/postApi"
import PostItem from "./PostItem"
import authApi from "@/api/server-side/authApi"
import Pagination from "./Pagination"

type Props = {
  categoryId?: string
  feature?: string
  status?: string
  type?: "my-blogs" | "blogs" | "home"
  userFavorite?: string
  page?: number
}
const PostList = async ({
  categoryId = "",
  feature = "",
  status,
  type,
  userFavorite,
  page = 1,
}: Props) => {
  const user = await authApi.getUser()
  const { data: posts, lastPage } = await postApi.getPost({
    categoryId,
    feature,
    status,
    authorId: type === "my-blogs" ? user._id : "",
    likes: userFavorite,
    page,
  })

  return (
    <>
      <ol className="relative mt-8 border-l border-gray-200 pr-10 dark:border-gray-700 md:ml-20 lg:ml-36 lg:pr-16">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ol>
      {type !== "home" ? <Pagination page={page} totalPage={lastPage} /> : null}
    </>
  )
}

export default PostList
