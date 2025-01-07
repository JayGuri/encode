import { Course } from './types'
import coursesData from '../data/courses.json'

const courses: Course[] = Array.isArray(coursesData) ? coursesData : [coursesData]

export async function getCourses(): Promise<Course[]> {
  return courses
}

export async function getCourseByName(name: string): Promise<Course | undefined> {
  const decodedName = decodeURIComponent(name)
  return courses.find(course => course.name === decodedName)
}

