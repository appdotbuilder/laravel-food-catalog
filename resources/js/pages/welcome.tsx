import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Welcome to FoodCatalog" />
            
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
                {/* Navigation */}
                <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-3">
                                <div className="text-2xl">🍽️</div>
                                <h1 className="text-xl font-bold text-gray-900">FoodCatalog</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <>
                                        <Link href="/dashboard">
                                            <Button variant="ghost">Dashboard</Button>
                                        </Link>
                                        <Link href="/admin/food-items">
                                            <Button variant="default">Admin Panel</Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button variant="ghost">Login</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button variant="default">Register</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                                🍽️ Discover Delicious Food
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Browse our extensive catalog of mouth-watering dishes, explore different categories, 
                                and find detailed information about every meal. From appetizers to desserts, 
                                we have something for every taste!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/">
                                    <Button size="lg" className="text-lg px-8 py-3">
                                        🔍 Browse Food Items
                                    </Button>
                                </Link>
                                <Link href="/?category=">
                                    <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                                        📱 View Categories
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ What Makes Us Special</h2>
                            <p className="text-lg text-gray-600">Everything you need to explore and discover amazing food</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="text-center p-6 rounded-lg bg-orange-50 border border-orange-100">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Search</h3>
                                <p className="text-gray-600">
                                    Find exactly what you're craving with our powerful search that looks through 
                                    food names, descriptions, and ingredients.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="text-center p-6 rounded-lg bg-green-50 border border-green-100">
                                <div className="text-4xl mb-4">🏷️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Organized Categories</h3>
                                <p className="text-gray-600">
                                    Browse by categories like appetizers, main courses, desserts, and more. 
                                    Each category is carefully curated for easy discovery.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="text-center p-6 rounded-lg bg-blue-50 border border-blue-100">
                                <div className="text-4xl mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Information</h3>
                                <p className="text-gray-600">
                                    Get complete details including ingredients, nutritional info, dietary restrictions, 
                                    and preparation time for every dish.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="text-center p-6 rounded-lg bg-purple-50 border border-purple-100">
                                <div className="text-4xl mb-4">🥗</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dietary Filters</h3>
                                <p className="text-gray-600">
                                    Filter by vegetarian, vegan, gluten-free, and dairy-free options to find 
                                    food that matches your dietary preferences.
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="text-center p-6 rounded-lg bg-red-50 border border-red-100">
                                <div className="text-4xl mb-4">⭐</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Featured Items</h3>
                                <p className="text-gray-600">
                                    Discover chef recommendations and seasonal specials highlighted 
                                    in our featured items section.
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="text-center p-6 rounded-lg bg-yellow-50 border border-yellow-100">
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Modern</h3>
                                <p className="text-gray-600">
                                    Built with modern technology for lightning-fast browsing and 
                                    a smooth, responsive user experience on any device.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Features Section */}
                <div className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">🛠️ Admin Management</h2>
                            <p className="text-lg text-gray-600">Powerful tools for administrators to manage content</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Admin Feature 1 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="text-3xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Food Item Management</h3>
                                <p className="text-gray-600 mb-4">
                                    Add, edit, and delete food items with rich details including pricing, 
                                    ingredients, nutritional information, and dietary classifications.
                                </p>
                                <ul className="text-sm text-gray-500 space-y-1">
                                    <li>• Complete CRUD operations</li>
                                    <li>• Rich text descriptions</li>
                                    <li>• Image management</li>
                                    <li>• Availability control</li>
                                </ul>
                            </div>

                            {/* Admin Feature 2 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="text-3xl mb-4">🗂️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Category Management</h3>
                                <p className="text-gray-600 mb-4">
                                    Organize food items into categories with custom sorting, descriptions, 
                                    and activation controls for better content organization.
                                </p>
                                <ul className="text-sm text-gray-500 space-y-1">
                                    <li>• Category creation & editing</li>
                                    <li>• Custom sort ordering</li>
                                    <li>• Active/inactive states</li>
                                    <li>• SEO-friendly URLs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            🚀 Ready to Explore?
                        </h2>
                        <p className="text-xl text-orange-100 mb-8">
                            Start browsing our delicious food catalog or register to access admin features
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                                    🍽️ Browse Menu Now
                                </Button>
                            </Link>
                            {!auth?.user && (
                                <Link href="/register">
                                    <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-orange-600">
                                        👨‍💼 Get Admin Access
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="text-2xl">🍽️</div>
                            <h3 className="text-xl font-bold">FoodCatalog</h3>
                        </div>
                        <p className="text-gray-400">
                            A modern, minimalist food catalog application built with Laravel & React
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}