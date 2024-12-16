'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Head } from '@inertiajs/react'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminChat from './components/AdminChat'

const slides = [
  {
    id: 1,
    image: '/storage/images/display1.png',
    title: 'Step Back in Time',
    description: 'Discover our collection of iconic retro styles',
    cta: 'Shop Now',
    link: '/category/new-arrivals'
  },
  {
    id: 2,
    image: '/storage/images/display2.png',
    title: 'Vintage Vibes',
    description: 'Up to 50% off on classic retro favorites',
    cta: 'View Sale',
    link: '/category/sale'
  },
  {
    id: 3,
    image: '/storage/images/display3.png',
    title: 'Timeless Treasures',
    description: 'Explore our most-loved retro pieces',
    cta: 'Discover',
    link: '/category/best-sellers'
  }
]

const categories = [
  { 
    id: 1, 
    name: 'Sneakers', 
    image: '/storage/images/sneaker.jpg', 
    link: '/category/sneakers' 
  },
  { 
    id: 2, 
    name: 'Formal Shoes', 
    image: '/storage/images/formal.jpg', 
    link: '/category/formal' 
  },
  { 
    id: 3, 
    name: 'Casual ', 
    image: '/storage/images/casual.avif', 
    link: '/category/retro-specials' 
  }
]

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <>
      <Head title="Welcome" />
      <div className="min-h-screen w-full">
        <Header />

        <main className="w-full">
          <div className="relative h-[600px] w-full overflow-hidden">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{backgroundImage: "url('/storage/images/background.jpg')"}}
            ></div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Slider content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center gap-8">
              {/* Image Section */}
              <div className="w-1/2 relative h-full">
                {slides.map((slide, index) => (
                  <img
                    key={slide.id}
                    src={slide.image}
                    alt={slide.title}
                    className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[80%] h-auto max-h-[400px] object-cover rounded-lg transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>

              {/* Text and Button Section */}
              <div className="w-1/2 flex flex-col justify-center text-white">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
                    }`}
                  >
                    <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-lg mb-8">{slide.description}</p>
                    <a
                      href={slide.link}
                      className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
                    >
                      {slide.cta}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => goToSlide((currentSlide + 1) % slides.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Navigation dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Featured Categories Section */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <a key={category.id} href={category.link} className="group">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="group-hover:scale-105 transition duration-300 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition duration-300">
                      <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </main>

        <AdminChat />
        <Footer />
      </div>
    </>
  )
}