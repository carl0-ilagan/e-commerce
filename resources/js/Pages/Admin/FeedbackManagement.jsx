import React, { useState, useEffect } from 'react';
import { Star, Check, MessageCircle, Trash2 } from 'lucide-react';
import axios from 'axios';
import { router } from '@inertiajs/react';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('/api/feedback');
      setFeedbacks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load feedbacks');
      setLoading(false);
      console.error('Error fetching feedbacks:', err);
    }
  };

  const handleMarkReviewed = async (id) => {
    try {
      await axios.patch(`/admin/feedback/${id}/mark-reviewed`);
      setFeedbacks(feedbacks.map(feedback => 
        feedback.id === id ? { ...feedback, is_reviewed: true } : feedback
      ));
    } catch (error) {
      console.error('Error marking feedback as reviewed:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;

    try {
      await router.delete(`/admin/feedback/${id}`, {
        onSuccess: () => {
          setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
        },
      });
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const ReviewModal = ({ feedback, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h3 className="text-xl font-semibold mb-4">Review Feedback</h3>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <img
              src={feedback.user.profile_image_url}
              alt={feedback.user.name}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{feedback.user.name}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={`${
                      index < feedback.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-700 mt-2">{feedback.comment}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Close
          </button>
          <button
            onClick={() => {
              handleMarkReviewed(feedback.id);
              onClose();
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Mark as Reviewed
          </button>
        </div>
      </div>
    </div>
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="text-center py-8">Loading feedbacks...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Feedback Management</h2>
        <div className="text-gray-600">
          Total Feedbacks: {feedbacks.length}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={feedback.user.profile_image_url}
                        alt={feedback.user.name}
                        className="h-8 w-8 rounded-full mr-3"
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {feedback.user.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={`${
                            index < feedback.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md">
                      {feedback.comment}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(feedback.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      feedback.is_reviewed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feedback.is_reviewed ? 'Reviewed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {!feedback.is_reviewed && (
                        <button
                          onClick={() => {
                            setSelectedFeedback(feedback);
                            setShowReviewModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Review feedback"
                        >
                          <MessageCircle size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(feedback.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete feedback"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showReviewModal && selectedFeedback && (
        <ReviewModal
          feedback={selectedFeedback}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedFeedback(null);
          }}
        />
      )}
    </div>
  );
};

export default FeedbackManagement;