import React, { useState, useEffect } from 'react'
import { ChevronDown, Filter } from 'lucide-react'
import { Head } from '@inertiajs/react'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminChat from './components/AdminChat'
import ProductCard from './components/ProductCard'
import ProductQuickView from './components/ProductQuickView'
import axios from 'axios'

export default function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [sortBy, setSortBy] = useState('Featured')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showQuickView, setShowQuickView] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/shop/products')
      if (response.data.success) {
        setProducts(response.data.products)
        setFilteredProducts(response.data.products)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickView = (product) => {
    setSelectedProduct(product)
    setShowQuickView(true)
  }

  const handleFilterChange = () => {
    let newFilteredProducts = [...products]

    // Filter by price range
    newFilteredProducts = newFilteredProducts.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    )

    // Filter by color
    if (selectedColors.length > 0) {
      newFilteredProducts = newFilteredProducts.filter(product => 
        selectedColors.includes(product.color || '')
      )
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      newFilteredProducts = newFilteredProducts.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size.size))
      )
    }

    // Apply sorting
    if (sortBy === 'Price: Low to High') {
      newFilteredProducts.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'Price: High to Low') {
      newFilteredProducts.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'Newest Arrivals') {
      newFilteredProducts.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }

    setFilteredProducts(newFilteredProducts)
  }

  return (
    <>
      <Head title="Shop" />
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>

          <div className="flex justify-between items-center mb-6">
            <button
              className="flex items-center text-gray-600 hover:text-gray-800"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={20} className="mr-2" />
              Filter
            </button>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setSortBy(e.target.value)
                  handleFilterChange()
                }}
                value={sortBy}
              >
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
              <ChevronDown size={20} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {isFilterOpen && (
            <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
              {/* Filter content - same as before */}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          )}
        </main>

        {showQuickView && selectedProduct && (
          <ProductQuickView
            product={selectedProduct}
            onClose={() => setShowQuickView(false)}
          />
        )}

        <AdminChat />
        <Footer />
      </div>
    </>
  )
}