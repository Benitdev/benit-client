import courseApi from "@/api/courseApi"
import Heading from "@/components/common/Heading"

type Props = {
  params: { slug: string }
}

const CourseDetailPage = async ({ params: { slug } }: Props) => {
  const course = await courseApi.getCourseDetail(slug)
  return (
    <div className="mt-5 flex p-2 text-slate-200 lg:p-5">
      <div className="flex-[0.6] space-y-4">
        <Heading>{course.title}</Heading>
        <p className="text-slate-400">{course.description}</p>
        <div className="py-4">
          <h3 className="text-large font-bold">Bạn sẽ học được gì?</h3>
          <ul className="mt-4 grid grid-cols-2 gap-4">
            {course.goals.map((goal) => (
              <li key={goal} className="flex gap-3">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="check"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-6 w-6 shrink-0 text-red-600 "
                >
                  <path
                    fill="currentColor"
                    d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                  ></path>
                </svg>
                {goal}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-large font-bold">Nội dung khoá học</h3>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
