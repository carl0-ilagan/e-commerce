import React, { useState } from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';

const ProductQuickView = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price) => {
    return `₱${parseFloat(price).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

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
          {/* Image Gallery */}
          <div className="space-y-4">
            <img 
              src={product.images && product.images.length > 0 
                ? `/storage/${product.images[currentImageIndex].image_path}`
                : '/images/default-product.jpg'} 
              alt={product.name} 
              className="w-full h-64 object-cover rounded-lg"
            />
            
            {/* Thumbnail Navigation */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-blue-500' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={`/storage/${image.image_path}`}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <p className="text-2xl font-bold mb-4">{formatPrice(product.price)}</p>
            
            {/* Category */}
            {product.category && (
              <p className="text-gray-600 mb-4">Category: {product.category}</p>
            )}

            {/* Description */}
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Size:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button 
                      key={size.id || size.size}
                      onClick={() => setSelectedSize(size.size)}
                      className={`border px-3 py-1 rounded-full transition-colors ${
                        selectedSize === size.size
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {size.size}
                      {size.inventory !== undefined && ` (${size.inventory})`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            {product.stock !== undefined && (
              <p className="text-gray-600 mb-4">
                In Stock: {product.stock}
              </p>
            )}

            {/* Sold Count */}
            {product.soldCount !== undefined && (
              <p className="text-gray-600 mb-4">
                Sold: {product.soldCount}
              </p>
            )}

            {/* Add to Cart Button */}
            <button 
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center"
              disabled={!selectedSize && product.sizes?.length > 0}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;