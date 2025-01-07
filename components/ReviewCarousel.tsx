'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ReviewCarousel({ reviews, textColor }: { reviews: string[], textColor: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }, [reviews.length])

  const prevReview = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }, [reviews.length])

  return (
    <div className="relative">
      <div className="overflow-hidden h-48">
        <div 
          className="transition-transform duration-300 ease-in-out flex"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${reviews.length * 100}%` }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="w-full flex-shrink-0 flex items-center justify-center p-4">
              <p className={`${textColor} text-center`}>{review}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevReview}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-600 bg-opacity-70 rounded-full p-2 text-white hover:bg-opacity-80 transition-colors"
        aria-label="Previous review"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextReview}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-600 bg-opacity-70 rounded-full p-2 text-white hover:bg-opacity-80 transition-colors"
        aria-label="Next review"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="flex justify-center mt-4">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

