import Link from 'next/link'
import { Course } from '../lib/types'

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/course/${encodeURIComponent(course.name)}`}>
      <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-opacity-40 h-full flex flex-col">
        <div className="relative h-48 w-full">
          {course.image && course.image.trim() !== '' ? (
            <img
              src={course.image}
              alt={course.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-bold">
            {course.rating ? course.rating.toFixed(1) : 'N/A'}
          </div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{course.name}</h2>
          <p className="text-gray-700 mb-2">Instructor: {course.instructor || 'Unknown'}</p>
          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{course.overview || 'No overview available'}</p>
          <div className="flex flex-wrap gap-2">
            {course.tags && course.tags.length > 0 ? (
              course.tags.map((tag) => (
                <span key={tag} className="bg-blue-600 bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">No tags available</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

