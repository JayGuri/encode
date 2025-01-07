import Link from 'next/link'

export default function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  return (
    <div className="flex justify-center mt-8 space-x-4">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="px-4 py-2 bg-blue-600 bg-opacity-70 rounded-md text-white hover:bg-opacity-80 transition-colors">
          Previous
        </Link>
      )}
      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 bg-blue-600 bg-opacity-70 rounded-md text-white hover:bg-opacity-80 transition-colors">
          Next
        </Link>
      )}
    </div>
  )
}

