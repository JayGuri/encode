import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center mt-8 space-x-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 bg-blue-600 bg-opacity-70 rounded-md text-white hover:bg-opacity-80 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <span className="px-4 py-2 bg-blue-600 bg-opacity-70 rounded-md text-white">
        {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-600 bg-opacity-70 rounded-md text-white hover:bg-opacity-80 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

