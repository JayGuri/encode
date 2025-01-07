import { getCourseByName, getCourses } from '@/lib/api'
import ReviewCarousel from '@/components/ReviewCarousel'
import Link from 'next/link'

export async function generateStaticParams() {
  const courses = await getCourses()
  return courses.map((course) => ({
    name: encodeURIComponent(course.name),
  }))
}

export default async function CoursePage({ params }: { params: { name: string } }) {
  const course = await getCourseByName(decodeURIComponent(params.name))

  if (!course) {
    return <div className="text-center text-gray-800 text-2xl mt-10">Course not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Courses</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Course Information */}
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{course.name}</h1>
            <p className="text-gray-700 mb-4">{course.overview}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Duration</h2>
                <p className="text-gray-700">{course.duration}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Rating</h2>
                <p className="text-gray-700">{course.rating.toFixed(1)} / 5.0</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {course.techStack.map((tech) => (
                <span key={tech} className="bg-blue-600 bg-opacity-70 text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-100 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Instructor Information */}
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
          <img
            src={course.instructor_photo}
            alt={course.instructor}
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{course.instructor}</h2>
            <p className="text-gray-700">{course.instructor_description}</p>
          </div>
        </div>
      </div>

      {/* Course Content and Video */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Course Content</h2>
          <p className="text-gray-700">{course.detailedContent}</p>
        </div>
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Course Preview</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <iframe
              src={course.dummyvideo_link}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h2>
        <div className="h-64">
          <ReviewCarousel reviews={course.reviews} textColor="text-gray-700" />
        </div>
      </div>
    </div>
  )
}

