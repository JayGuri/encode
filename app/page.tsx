import CourseGrid from '@/components/CourseGrid'
import Pagination from '@/components/Pagination'
import { getCourses } from '@/lib/api'

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = parseInt(searchParams.page) || 1
  const pageSize = 12
  const courses = await getCourses()
  const totalPages = Math.ceil(courses.length / pageSize)
  const paginatedCourses = courses.slice((page - 1) * pageSize, page * pageSize)

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gradient">Explore Our Courses</h1>
      <CourseGrid courses={paginatedCourses} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  )
}

