import courseApi from "@/api/server-side/courseApi"
import Heading from "@/components/common/Heading/Heading"
import RoadMapCourseList from "./RoadMapCourseList"

type Props = {
  type: "frontend" | "backend"
}

export default async function RoadMapList({ type }: Props) {
  const categories = await courseApi.getCourseCategories()
  return (
    <div>
      {type === "frontend" && (
        <div className="max-w-[800px] space-y-2">
          <Heading>Front-end</Heading>
          <p>
            Hầu hết các websites hoặc ứng dụng di động đều có 2 phần là
            Front-end và Back-end. Front-end là phần giao diện người dùng nhìn
            thấy và có thể tương tác, đó chính là các ứng dụng mobile hay những
            website bạn đã từng sử dụng. Vì vậy, nhiệm vụ của lập trình viên
            Front-end là xây dựng các giao diện đẹp, dễ sử dụng và tối ưu trải
            nghiệm người dùng.
          </p>
          <p>
            Tại Việt Nam,{" "}
            <span className="text-pink-600">lương trung bình</span> cho lập
            trình viên front-end vào khoảng{" "}
            <span className="font-bold">16.000.000đ / tháng</span>. Dưới đây là
            các khóa học Benit đã tạo ra dành cho bất cứ ai theo đuổi sự nghiệp
            trở thành một lập trình viên Front-end.
          </p>
          <p className="border-l-4 border-pink-600 bg-slate-800 px-4 py-2 text-slate-400">
            Các khóa học có thể chưa đầy đủ, Benit vẫn đang nỗ lực hoàn thiện
            trong thời gian sớm nhất.
          </p>
        </div>
      )}
      <div className="mt-10 space-y-4">
        {categories.map((category, index) => (
          <div key={category._id}>
            <h2 className="text-large font-bold tracking-wider">
              {index + 1}. {category.title}
            </h2>
            <p className="my-4">{category.description}</p>
            {/* @ts-expect-error  */}
            <RoadMapCourseList categoryId={category._id} type={type} />
          </div>
        ))}
      </div>
    </div>
  )
}
