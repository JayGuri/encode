"use client"
import { useState, useEffect } from 'react'
import CourseGrid from '@/components/CourseGrid'
import Pagination from '@/components/Pagination'
import { getCourses } from '@/lib/api'
import { Course } from '@/lib/types'

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 12
  const totalPages = Math.ceil(courses.length / pageSize)

  useEffect(() => {
    async function fetchCourses() {
      const allCourses = await getCourses()
      setCourses(allCourses)
    }
    fetchCourses()
  }, [])

  const paginatedCourses = courses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gradient">Explore Our Courses</h1>
      <CourseGrid courses={paginatedCourses} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  )
}

