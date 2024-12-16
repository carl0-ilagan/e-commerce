import { useState } from "react";
import { Link } from '@inertiajs/react';
import { ShoppingCart, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price) => {
    return `₱${parseFloat(price).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Image Preview Modal Component
  const ImagePreviewModal = () => {
    if (!showModal) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        onClick={() => setShowModal(false)}
      >
        <div className="relative max-w-4xl w-full">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setShowModal(false)}
          >
            <X size={24} />
          </button>

          <div className="relative">
            <img
              src={`/storage/${product.images[currentImageIndex].image_path}`}
              alt={`Product image ${currentImageIndex + 1}`}
              className="w-full rounded-lg"
            />

            {product.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(prev => 
                      prev === 0 ? product.images.length - 1 : prev - 1
                    );
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(prev => 
                      prev === product.images.length - 1 ? 0 : prev + 1
                    );
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? 'border-blue-500' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={`/storage/${image.image_path}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img
            src={product.images && product.images.length > 0 
              ? `/storage/${product.images[0].image_path}`
              : '/images/default-product.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover cursor-pointer"
            onClick={() => {
              if (product.images?.length > 0) {
                setCurrentImageIndex(0);
                setShowModal(true);
              }
            }}
          />
          
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-4">
              <button 
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => {/* Add to cart logic */}}
              >
                <ShoppingCart size={20} className="text-gray-800" />
              </button>
              <button 
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => onQuickView(product)}
              >
                <Eye size={20} className="text-gray-800" />
              </button>
            </div>
          )}

          {product.images?.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
              +{product.images.length - 1}
            </div>
          )}

          {product.badge && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              {product.badge}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{formatPrice(product.price)}</p>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">{product.category}</span>
            {product.soldCount && (
              <span className="text-sm text-gray-500">{product.soldCount} Sold</span>
            )}
          </div>

          {product.sizes?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.sizes.map(size => (
                <span 
                  key={size.id || size.size}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {size.size} {size.inventory && `(${size.inventory})`}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors">
              Buy Now
            </button>
            <div className="flex space-x-2">
              <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                <ShoppingCart size={18} />
              </button>
              <button 
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
                onClick={() => onQuickView(product)}
              >
                <Eye size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ImagePreviewModal />
    </>
  );
};

export default ProductCard;