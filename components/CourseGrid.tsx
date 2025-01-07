import CourseCard from './CourseCard'
import { Course } from '../lib/types'

export default function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {courses.map((course) => (
        <CourseCard key={ course.name} course={course} />
      ))}
    </div>
  )
}

