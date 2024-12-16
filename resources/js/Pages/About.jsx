// resources/js/Pages/About.jsx
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import FeedbackCard from './components/FeedbackCard';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AdminChat from './components/AdminChat.jsx';
import { Star } from 'lucide-react';

export default function AboutPage() {
    const { auth, feedbacks = [] } = usePage().props;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        if (!rating) {
            setMessage('Please select a rating');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        setIsSubmitting(true);
        
        try {
            await router.post('/feedback', {
                rating: parseInt(rating),
                comment: comment.trim(),
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setRating(0);
                    setComment('');
                    setMessage('Feedback submitted successfully!');
                    setTimeout(() => setMessage(''), 3000);
                    console.log('Feedback submitted successfully');
                },
                onError: (errors) => {
                    console.error('Submission errors:', errors);
                    setMessage(errors.message || 'Error submitting feedback. Please try again.');
                    setTimeout(() => setMessage(''), 3000);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                }
            });
        } catch (error) {
            console.error('Submission error:', error);
            setMessage('An unexpected error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* About Section */}
                <section className="mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">About The Retro Alley</h1>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <p className="text-lg text-gray-700">
                                The Retro Alley is your one-stop destination for all things retro in the world of footwear. 
                                We're passionate about bringing back the classic styles that have stood the test of time, 
                                while infusing them with modern comfort and quality.
                            </p>
                            <p className="text-lg text-gray-700">
                                Founded in 2010, our journey began with a simple idea: to preserve the charm of vintage 
                                shoe designs and make them accessible to a new generation of fashion enthusiasts. Today, 
                                we're proud to offer a curated collection of retro-inspired shoes that cater to various 
                                tastes and occasions.
                            </p>
                            <p className="text-lg text-gray-700">
                                At The Retro Alley, we believe that every pair of shoes tells a story. We're committed 
                                to helping you find the perfect pair that not only complements your style but also becomes 
                                a part of your personal narrative.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3891.3996919157944!2d121.4781466279892!3d12.75253528828802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1734156750740!5m2!1sen!2sph"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="The Retro Alley Store Location"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </section>

                {/* Feedback Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Feedback</h2>
                    
                    {/* Message Display */}
                    {message && (
                        <div className={`p-4 rounded-lg mb-6 ${
                            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                            {message}
                        </div>
                    )}

                    {/* Feedback Display */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {feedbacks.map((feedback) => (
                      <FeedbackCard 
                        key={feedback.id}
                        name={feedback.user.name}
                        rating={feedback.rating}
                        comment={feedback.comment}
                        date={formatDate(feedback.created_at)}
                        profileImage={feedback.user.profile_image_url} // Using the accessor from your User model
                      />
                    ))}
                    </div>

                    {/* Feedback Form */}
                    {auth.user ? (
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Share Your Experience</h3>
                            <form onSubmit={handleSubmitFeedback}>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Rating <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                className="focus:outline-none transition-colors duration-200"
                                            >
                                                <Star
                                                    size={28}
                                                    className={`${
                                                        star <= (hoveredRating || rating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                    } transition-colors duration-200`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <label htmlFor="comment" className="block text-gray-700 text-sm font-medium mb-2">
                                        Your Comment <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows="4"
                                        required
                                        placeholder="Share your thoughts about our products and service..."
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
                                        ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
                                        transition duration-200`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                            <p className="text-lg text-gray-700 mb-4">
                                Want to share your experience with The Retro Alley?
                            </p>
                            <a
                                href="/login"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                            >
                                Log in to leave a review
                            </a>
                        </div>
                    )}
                </section>
            </main>

            <AdminChat />
            <Footer />
        </div>
    );
}