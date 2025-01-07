import Image from 'next/image'
import { getCourseByName, getCourses } from '@/lib/api'
import ReviewCarousel from '@/components/ReviewCarousel'
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Courses</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Course Information */}
        <div className="lg:col-span-2 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image
              src={course.image}
              alt={course.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-6">
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
            <h2 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Course Content</h2>
            <p className="text-gray-700">{course.detailedContent}</p>
          </div>
        </div>

        {/* Instructor Information */}
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
          <div className="relative aspect-square w-full">
            <Image
              src={course.instructor_photo}
              alt={course.instructor}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gradient">{course.instructor}</h2>
            <p className="text-gray-700">{course.instructor_description}</p>
          </div>
        </div>
      </div>

      {/* Course Preview */}
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gradient">Course Preview</h2>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <iframe
            src={course.dummyvideo_link}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold mb-4 text-gradient">Reviews</h2>
        <div className="h-64">
          <ReviewCarousel reviews={course.reviews} textColor="text-gray-700" />
        </div>
      </div>
    </div>
  )
}

