import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-start">
          {/* Quick Links Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-gray-800">Home</a></li>
              <li><a href="/shop" className="text-gray-600 hover:text-gray-800">Shop</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-gray-800">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-gray-800">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <p className="text-gray-600 mb-2">Sign up for the latest retro styles!</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-gray-600 border-t pt-4">
          &copy; 2023 The Retro Alley. All rights reserved.
        </div>
      </div>
    </footer>
  );
}