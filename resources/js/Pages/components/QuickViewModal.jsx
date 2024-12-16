import { X } from 'lucide-react'
import Image from 'next/image'

export default function QuickViewModal({ product, onClose }) {
  if (!product) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-80">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div>
            <p className="text-2xl font-bold mb-4">₱{product.price.toLocaleString()}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Size:</h3>
              <div className="flex flex-wrap gap-2">
                {['6', '7', '8', '9', '10', '11', '12'].map((size) => (
                  <button
                    key={size}
                    className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
            </p>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
              disabled={!product.inStock}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

