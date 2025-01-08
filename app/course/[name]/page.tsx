import Image from 'next/image'
import { getCourseByName, getCourses } from '@/lib/api'
import Link from 'next/link'
import { Star, Clock, Tag, DollarSign } from 'lucide-react'

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

  const youtubeEmbedUrl = course.dummyvideo_link.replace('youtu.be', 'www.youtube.com/embed').split('?')[0]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Courses</Link>
      
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          {/* Course Information and Instructor Information side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Course Information */}
            <div className="lg:col-span-2">
              <div className="relative aspect-video w-full mb-6">
                <Image
                  src={course.image}
                  alt={course.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gradient">{course.name}</h1>
              <p className="text-gray-700 mb-4 important-info">{course.overview}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  <span>{course.rating.toFixed(1)} / 5.0</span>
                </div>
                <div className="flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{course.techStack.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-green-600">₹{course.price}</span>
                </div>
              </div>
            </div>

            {/* Instructor Information */}
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="relative aspect-square w-full mb-4">
                <Image
                  src={course.instructor_photo}
                  alt={course.instructor}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gradient">{course.instructor}</h2>
              <p className="text-gray-700">{course.instructor_description}</p>
            </div>
          </div>

          {/* Course Content (full width) */}
          <div className="bg-gray-100 rounded-xl p-4 mb-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Course Content</h2>
            <p className="text-gray-700">{course.detailedContent}</p>
          </div>

          {/* Course Preview and Reviews side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Course Preview */}
            <div className="bg-gray-100 rounded-xl p-4 flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-gradient">Course Preview</h2>
              <div className="flex-grow relative">
                <iframe
                  src={youtubeEmbedUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-gray-100 rounded-xl p-4">
              <h2 className="text-xl font-bold mb-4 text-gradient">Reviews</h2>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {course.reviews.map((review, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow">
                    <p className="text-gray-700 text-sm">{review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

