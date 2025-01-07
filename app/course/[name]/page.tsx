import { getCourseByName } from '@/lib/api'
import Image from 'next/image'
import ReviewCarousel from '@/components/ReviewCarousel'
import Link from 'next/link'

export default async function CoursePage({ params }: { params: { name: string } }) {
  const course = await getCourseByName(decodeURIComponent(params.name))

  if (!course) {
    return <div className="text-center text-gray-800 text-2xl mt-10">Course not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Courses</Link>
      <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-64 md:h-96 bg-gray-800">
          {course.image && course.image.trim() !== '' && (
            <Image
              src={course.image}
              alt={course.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h1 className="text-2xl md:text-4xl font-bold">{course.name}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Course Overview</h2>
            <p className="text-gray-700 mb-4">{course.overview}</p>
            <p className="text-gray-700 mb-2">Instructor: {course.instructor}</p>
            <p className="text-gray-700 mb-2">Duration: {course.duration}</p>
            <p className="text-gray-700 mb-2">Rating: {course.rating.toFixed(1)}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Tech Stack</h2>
            <ul className="list-disc list-inside">
              {course.techStack.map((tech) => (
                <li key={tech} className="text-gray-600 mb-2">{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden mb-8 p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Course Content</h2>
        <p className="text-gray-700">{course.detailedContent}</p>
      </div>

      <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h2>
        <div className="h-64">
          <ReviewCarousel reviews={course.reviews} textColor="text-gray-700" />
        </div>
      </div>
    </div>
  )
}

