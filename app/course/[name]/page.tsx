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
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Course Information and Instructor Information side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Course Information */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-video w-full mb-6 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={course.image}
                  alt={course.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gradient">{course.name}</h1>
              <p className="text-gray-700 mb-4 important-info bg-yellow-50 p-4 rounded-lg shadow-inner">{course.overview}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center bg-blue-50 p-2 rounded-lg">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="text-blue-700">{course.duration}</span>
                </div>
                <div className="flex items-center bg-yellow-50 p-2 rounded-lg">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className="text-yellow-700">{course.rating.toFixed(1)} / 5.0</span>
                </div>
                <div className="flex items-center bg-purple-50 p-2 rounded-lg">
                  <Tag className="w-5 h-5 mr-2 text-purple-500" />
                  <span className="text-purple-700">{course.techStack.join(', ')}</span>
                </div>
                <div className="flex items-center bg-green-50 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  <span className="text-2xl font-bold text-green-600">₹{course.price}</span>
                </div>
              </div>
            </div>

            {/* Instructor Information */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-square w-full mb-4 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={course.instructor_photo}
                  alt={course.instructor}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gradient">{course.instructor}</h2>
              <p className="text-gray-700">{course.instructor_description}</p>
            </div>
          </div>

          {/* Course Content (full width) */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gradient">Course Content</h2>
            <p className="text-gray-700">{course.detailedContent}</p>
          </div>

          {/* Course Preview and Reviews side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course Preview */}
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-gradient">Course Preview</h2>
              <div className="w-full aspect-video relative rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={youtubeEmbedUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-gradient">Reviews</h2>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
                {course.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md">
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

