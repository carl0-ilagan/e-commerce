import React, { useState } from 'react';
import { Star, MessageCircle, Check } from 'lucide-react';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, user: 'John Doe', product: 'Retro Runner', rating: 4, comment: 'Great shoes, very comfortable!', reviewed: false },
    { id: 2, user: 'Jane Smith', product: 'Vintage Kicks', rating: 5, comment: 'Absolutely love these! Will buy again.', reviewed: true },
    { id: 3, user: 'Mike Johnson', product: 'Classic Sneakers', rating: 3, comment: 'Decent shoes, but a bit tight.', reviewed: false },
  ]);

  const handleMarkReviewed = (id) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === id ? { ...feedback, reviewed: true } : feedback
    ));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Feedback Management</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td className="px-6 py-4 whitespace-nowrap">{feedback.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">{feedback.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1">{feedback.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{feedback.comment}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {!feedback.reviewed ? (
                    <button
                      onClick={() => handleMarkReviewed(feedback.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      <Check size={16} className="mr-1" />
                      Mark Reviewed
                    </button>
                  ) : (
                    <span className="text-green-500 flex items-center">
                      <Check size={16} className="mr-1" />
                      Reviewed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackManagement;

