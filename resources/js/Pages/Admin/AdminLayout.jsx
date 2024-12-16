// resources/js/Layouts/AdminLayout.jsx

import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Header */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/">
                                    <span className="text-xl font-bold text-gray-800">Admin Panel</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600">{auth.user.name}</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <div className={`w-64 bg-white shadow-md ${isSidebarOpen ? '' : 'hidden'}`}>
                    <div className="h-full px-3 py-4">
                        <nav className="space-y-1">
                            <Link
                                href={route('admin.dashboard')}
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                Dashboard
                            </Link>
                            {/* Add more admin navigation links here */}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}