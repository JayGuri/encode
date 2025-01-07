import CourseCard from './CourseCard'
import { Course } from '@/lib/types'

export default function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.name} course={course} />
      ))}
    </div>
  )
}

