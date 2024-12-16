'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: '/placeholder.svg?height=400&width=800',
    title: 'New Arrivals',
    description: 'Check out our latest retro styles!',
    cta: 'Shop Now',
    link: '/category/new-arrivals'
  },
  {
    id: 2,
    image: '/placeholder.svg?height=400&width=800',
    title: 'Up to 50% Off',
    description: 'Huge discounts on retro classics!',
    cta: 'View Sale',
    link: '/category/sale'
  },
  {
    id: 3,
    image: '/placeholder.svg?height=400&width=800',
    title: 'Customer Favorites',
    description: 'See what everyone\'s loving!',
    cta: 'Explore',
    link: '/category/best-sellers'
  }
]

const categories = [
  { id: 1, name: 'Sneakers', image: '/placeholder.svg?height=300&width=300', link: '/category/sneakers' },
  { id: 2, name: 'Formal Shoes', image: '/placeholder.svg?height=300&width=300', link: '/category/formal' },
  { id: 3, name: 'Retro Specials', image: '/placeholder.svg?height=300&width=300', link: '/category/retro-specials' }
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-[400px] mb-12">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-xl mb-4">{slide.description}</p>
                <Link
                  href={slide.link}
                  className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">Featured Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link key={category.id} href={category.link} className="group">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition duration-300">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

