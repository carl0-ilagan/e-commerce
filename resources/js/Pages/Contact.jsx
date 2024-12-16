'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import Header from './components/Header.jsx'; // Import Header
import Footer from './components/Footer.jsx'; // Import Footer
import AdminChat from './components/AdminChat.jsx'; // Import AdminChat

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div>
      <Header /> {/* Include Header */}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-screen-lg">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info Section */}
          <div>
            <p className="mb-4">
              We'd love to hear from you! Whether you have a question about our products, need help with an order, or just want to say hello, don't hesitate to reach out.
            </p>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Our Location</h2>
              <p>123 Retro Street, Vintage City, RC 12345</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Email</h2>
              <p>info@retroalley.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Phone</h2>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            >
              <Send size={20} className="mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* AdminChat and Footer */}
      <AdminChat /> {/* Include AdminChat */}
      <Footer /> {/* Include Footer */}
    </div>
  )
}
