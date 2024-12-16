// resources/js/Pages/Cart.jsx
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Trash2, ShoppingBag } from 'lucide-react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AdminChat from './components/AdminChat.jsx';

const Image = ({ src, alt, width, height, className }) => {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
        />
    )
}

const initialCartItems = [
    { id: 1, name: 'Classic Sneaker', price: 1500, quantity: 1, image: '/placeholder.svg' },
    { id: 2, name: 'Retro Runner', price: 1800, quantity: 2, image: '/placeholder.svg' },
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart')
            return savedCart ? JSON.parse(savedCart) : initialCartItems
        }
        return initialCartItems
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 500)
    }, [])

    const updateQuantity = (id, newQuantity) => {
        if (isNaN(newQuantity) || newQuantity < 1) return
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ))
    }

    const removeItem = (id) => {
        if (window.confirm('Are you sure you want to remove this item?')) {
            setCartItems(cartItems.filter(item => item.id !== id))
        }
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>

                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : cartItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">Your cart is empty</p>
                        <Link
                            href="/shop"
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={40}
                                                            height={40}
                                                            className="rounded-full"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">₱{item.price.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center border rounded-l"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                        className="mx-1 w-16 text-center border rounded-none h-8"
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center border rounded-r"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">₱{(item.price * item.quantity).toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-900 transition-colors"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <Link
                                href="/shop"
                                className="text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                ← Continue Shopping
                            </Link>
                            
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="text-2xl font-bold">
                                    Total: ₱{total.toLocaleString()}
                                </div>
                                <Link
                                    href="/checkout"
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <AdminChat />
            <Footer />
        </div>
    );
}