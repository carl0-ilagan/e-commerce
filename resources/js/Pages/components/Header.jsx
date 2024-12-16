// resources/js/Pages/components/Header.jsx
import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, User, Menu, X, Trash2 } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const cartRef = useRef(null);

    // Get cart items from localStorage
    const getCartItems = () => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    };

    const [cartItems, setCartItems] = useState(getCartItems);

    // Update cart items when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            setCartItems(getCartItems());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const closeDropdowns = (e) => {
            if (isUserDropdownOpen && !e.target.closest('.user-dropdown')) {
                setIsUserDropdownOpen(false);
            }
            if (isCartOpen && !e.target.closest('.cart-dropdown')) {
                setIsCartOpen(false);
            }
        };

        document.addEventListener('click', closeDropdowns);
        return () => document.removeEventListener('click', closeDropdowns);
    }, [isUserDropdownOpen, isCartOpen]);

    const toggleUserDropdown = (e) => {
        e.stopPropagation();
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const toggleCart = (e) => {
        e.stopPropagation();
        setIsCartOpen(!isCartOpen);
    };

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const getProfileImage = () => {
        if (auth.user?.profile_image_url) {
            return auth.user.profile_image_url;
        }
        return '/storage/images/default-avatar.png';
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <img
                        src="/storage/images/retrologo.png"
                        alt="The Retro Alley Logo"
                        className="w-8 h-8"
                    />
                    <span className="text-2xl font-bold text-gray-800">The Retro Alley</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <nav className="flex items-center space-x-6">
                        <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
                        <Link href="/shop" className="text-gray-600 hover:text-gray-800">Shop</Link>
                        <Link href="/about" className="text-gray-600 hover:text-gray-800">About Us</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
                    </nav>
                </div>

                {/* Search, Cart, and User Icons */}
                <div className="flex items-center space-x-4">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Search size={20} />
                        </button>
                    </form>

                    {/* Cart Dropdown */}
                    <div className="relative cart-dropdown" ref={cartRef}>
                        <button
                            onClick={toggleCart}
                            className="text-gray-600 hover:text-gray-800 relative"
                        >
                            <ShoppingCart size={20} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </button>

                        {isCartOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800">Shopping Cart</h3>
                                </div>

                                <div className="max-h-96 overflow-y-auto">
                                    {cartItems.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500">
                                            Your cart is empty
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-100">
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="p-4 flex items-center space-x-4">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                                                        <p className="text-sm text-gray-500">
                                                            {item.quantity} × ₱{item.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {cartItems.length > 0 && (
                                    <div className="p-4 border-t border-gray-100">
                                        <div className="flex justify-between mb-4">
                                            <span className="font-semibold">Total:</span>
                                            <span className="font-semibold">₱{total.toLocaleString()}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <Link
                                                href="/cart"
                                                className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                                                onClick={() => setIsCartOpen(false)}
                                            >
                                                View Cart
                                            </Link>
                                            <Link
                                                href="/checkout"
                                                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                                onClick={() => setIsCartOpen(false)}
                                            >
                                                Checkout
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* User Dropdown - Desktop only */}
                    <div className="relative user-dropdown hidden md:block">
                        <button
                            aria-label="User Menu"
                            className="text-gray-600 hover:text-gray-800 flex items-center"
                            onClick={toggleUserDropdown}
                        >
                            {auth.user ? (
                                <img
                                    src={getProfileImage()}
                                    alt={auth.user.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/storage/images/default-avatar.png';
                                    }}
                                />
                            ) : (
                                <User size={20} />
                            )}
                        </button>

                        {isUserDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                                {auth.user ? (
                                    <>
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={getProfileImage()}
                                                    alt={auth.user.name}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/storage/images/default-avatar.png';
                                                    }}
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-700">{auth.user.name}</span>
                                                    <span className="text-xs text-gray-500">{auth.user.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Profile
                                        </Link>
                                        <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Orders
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Login
                                        </Link>
                                        <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        aria-label="Toggle Menu"
                        className="md:hidden text-gray-600 hover:text-gray-800"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white py-2 border-t border-gray-100">
                    <form onSubmit={handleSearch} className="px-4 py-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Search size={20} />
                            </button>
                        </div>
                    </form>
                    <Link href="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Home</Link>
                    <Link href="/shop" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Shop</Link>
                    <Link href="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">About Us</Link>
                    <Link href="/contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Contact</Link>
                    
                    {/* User section in mobile menu */}
                    {auth.user ? (
                        <div className="border-t border-gray-100 mt-2 pt-2">
                            <div className="px-4 py-2 flex items-center space-x-3">
                                <img
                                    src={getProfileImage()}
                                    alt={auth.user.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/storage/images/default-avatar.png';
                                    }}
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-700">{auth.user.name}</span>
                                    <span className="text-xs text-gray-500">{auth.user.email}</span>
                                </div>
                            </div>
                            <Link href="/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Profile</Link>
                            <Link href="/orders" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Orders</Link>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                            >
                                Logout
                            </Link>
                        </div>
                    ) : (
                        <div className="border-t border-gray-100 mt-2 pt-2">
                            <Link href="/login" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Login</Link>
                            <Link href="/register" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Sign Up</Link>
                        </div>
                    )}
                </nav>
            )}
        </header>
    );
}