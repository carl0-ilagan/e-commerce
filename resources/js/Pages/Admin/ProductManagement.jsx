import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, X, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    sizeInventory: {
      'US 6': { selected: false, inventory: '' },
      'US 7': { selected: false, inventory: '' },
      'US 8': { selected: false, inventory: '' },
      'US 9': { selected: false, inventory: '' },
      'US 10': { selected: false, inventory: '' },
      'US 11': { selected: false, inventory: '' },
      'US 12': { selected: false, inventory: '' },
    },
    images: []
  });

  // Helper function for price formatting
  const formatPrice = (price) => {
    return `₱${parseFloat(price).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Image Preview Modal Component
  const ImagePreviewModal = ({ src, onClose }) => {
    if (!src) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="relative">
          <img 
            src={src} 
            alt="Preview" 
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/admin/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    
    const sizeInventory = {
      'US 6': { selected: false, inventory: '' },
      'US 7': { selected: false, inventory: '' },
      'US 8': { selected: false, inventory: '' },
      'US 9': { selected: false, inventory: '' },
      'US 10': { selected: false, inventory: '' },
      'US 11': { selected: false, inventory: '' },
      'US 12': { selected: false, inventory: '' },
    };

    product.sizes.forEach(size => {
      sizeInventory[size.size] = {
        selected: true,
        inventory: size.inventory.toString()
      };
    });

    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      sizeInventory: sizeInventory,
      images: product.images.map(img => ({
        file: null,
        preview: `/storage/${img.image_path}`,
        existing: true,
        id: img.id
      }))
    });

    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeToggle = (size) => {
    setFormData({
      ...formData,
      sizeInventory: {
        ...formData.sizeInventory,
        [size]: {
          ...formData.sizeInventory[size],
          selected: !formData.sizeInventory[size].selected
        }
      }
    });
  };

  const handleInventoryChange = (size, value) => {
    setFormData({
      ...formData,
      sizeInventory: {
        ...formData.sizeInventory,
        [size]: {
          ...formData.sizeInventory[size],
          inventory: value
        }
      }
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 3) {
      alert('You can only upload up to 3 images');
      return;
    }
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      existing: false
    }));
    
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages].slice(0, 3)
    });
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    if (!newImages[index].existing) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    
    const selectedSizes = Object.entries(formData.sizeInventory)
      .filter(([_, data]) => data.selected)
      .map(([size, data]) => ({
        size,
        inventory: parseInt(data.inventory)
      }));
    
    formDataToSend.append('sizeInventory', JSON.stringify(selectedSizes));

    // Handle images
    formData.images.forEach((image) => {
      if (!image.existing) {
        formDataToSend.append('images[]', image.file);
      } else {
        formDataToSend.append('existing_images[]', image.id);
      }
    });

    try {
      if (isEditMode) {
        await axios.post(`/admin/products/${selectedProduct.id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-HTTP-Method-Override': 'PUT'
          },
        });
      } else {
        await axios.post('/admin/products', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      fetchProducts();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/admin/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      sizeInventory: {
        'US 6': { selected: false, inventory: '' },
        'US 7': { selected: false, inventory: '' },
        'US 8': { selected: false, inventory: '' },
        'US 9': { selected: false, inventory: '' },
        'US 10': { selected: false, inventory: '' },
        'US 11': { selected: false, inventory: '' },
        'US 12': { selected: false, inventory: '' },
      },
      images: []
    });
    setIsEditMode(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Product Management</h2>
        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedProduct(null);
            setShowModal(true);
          }}
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sizes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.images && product.images[0] && (
                      <div className="relative group cursor-pointer">
                        <img
                          src={`/storage/${product.images[0].image_path}`}
                          alt={product.name}
                          className="h-16 w-16 rounded-lg object-cover mr-3 hover:opacity-75 transition-opacity"
                          onClick={() => setPreviewImage(`/storage/${product.images[0].image_path}`)}
                        />
                        {product.images.length > 1 && (
                          <div className="absolute bottom-0 right-3 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 rounded-full">
                            +{product.images.length - 1}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatPrice(product.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <span 
                        key={size.id} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {size.size} ({size.inventory})
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 md:p-6 border-b">
              <h3 className="text-lg md:text-xl font-semibold">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
              {/* Basic Product Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (₱)
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      ₱
                    </span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-8 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Running">Running</option>
                    <option value="Casual">Casual</option>
                    <option value="Sports">Sports</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
              </div>

              {/* Size and Inventory Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sizes and Inventory
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(formData.sizeInventory).map(([size, data]) => (
                    <div key={size} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{size}</span>
                        <button
                          type="button"
                          onClick={() => handleSizeToggle(size)}
                          className={`px-3 py-1 rounded ${
                            data.selected
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {data.selected ? 'Available' : 'Unavailable'}
                        </button>
                      </div>
                      {data.selected && (
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Stock</label>
                          <input
                            type="number"
                            value={data.inventory}
                            onChange={(e) => handleInventoryChange(size, e.target.value)}
                            className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                            min="0"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images (Up to 3)
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  {formData.images.length < 3 && (
                    <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        multiple={formData.images.length < 3}
                      />
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                        <span className="mt-2 block text-sm font-medium text-gray-600">
                          Add Image
                        </span>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {isEditMode ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <ImagePreviewModal
          src={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  );
};

export default ProductManagement;

