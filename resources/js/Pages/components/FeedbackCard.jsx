import { Star } from 'lucide-react'
import { UserCircle } from 'lucide-react'

export default function FeedbackCard({ name, rating, comment, date, profileImage }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {profileImage ? (
            <img 
              src={profileImage}
              alt={`${name}'s profile`}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <UserCircle className="w-12 h-12 text-gray-400" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={`${
                    index < rating 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="pl-15">
        <p className="text-gray-600">{comment}</p>
      </div>
    </div>
  )
}