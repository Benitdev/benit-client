import Heading from "@/components/common/Heading/Heading"
import CommentInput from "./CommentInput"
import CommentList from "./CommentList"
import authApi from "@/api/server-side/authApi"

type Props = {
  postId: string
  type?: "postId" | "lessonId"
}

export default async function PostComment({ postId, type = "postId" }: Props) {
  const user = await authApi.getUser()

  return (
    <div>
      {type === "postId" ? (
        <Heading className="border-b border-slate-200/40 text-heading">
          Bình luận
        </Heading>
      ) : (
        <h1 className="border-b border-slate-200/40 font-bold text-pink-600">
          Hỏi đáp
        </h1>
      )}
      <div className="space-y-3">
        <div className="rounded-xl bg-slate-900 p-4">
          <CommentInput user={user} postId={postId} type={type} />
        </div>
        <CommentList postId={postId} user={user} type={type} />
      </div>
    </div>
  )
}
