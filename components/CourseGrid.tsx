import { Suspense } from 'react'
import CourseCard from './CourseCard'
import { Course } from '@/lib/types'

function SkeletonCard() {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video w-full skeleton"></div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="h-6 w-3/4 mb-2 skeleton"></div>
        <div className="h-4 w-1/2 mb-2 skeleton"></div>
        <div className="h-4 w-full mb-4 skeleton"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 w-1/4 skeleton"></div>
          <div className="h-6 w-1/4 skeleton"></div>
        </div>
      </div>
    </div>
  )
}

export default function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Suspense fallback={[...Array(12)].map((_, i) => <SkeletonCard key={i} />)}>
        {courses.map((course) => (
          <CourseCard key={course.name} course={course} />
        ))}
      </Suspense>
    </div>
  )
}

