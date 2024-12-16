'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

export default function RatingAndFeedback({ productId }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the rating and feedback to your backend
    console.log('Submitted:', { productId, rating, feedback })
    // Reset form after submission
    setRating(0)
    setFeedback('')
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Rate & Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex">
          {[...Array(5)].map((_, index) => {
            index += 1
            return (
              <button
                type="button"
                key={index}
                className={`${
                  index <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                } text-2xl`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <Star fill={index <= (hover || rating) ? 'currentColor' : 'none'} />
              </button>
            )
          })}
        </div>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your review here..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  )
}

