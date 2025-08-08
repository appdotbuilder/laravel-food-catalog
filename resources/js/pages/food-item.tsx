import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FoodNav } from '@/components/food-nav';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface FoodItem {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string | null;
    ingredients: string[] | null;
    nutritional_info: Record<string, string | number> | null;
    dietary_type: string;
    is_available: boolean;
    is_featured: boolean;
    preparation_time: number | null;
    category: Category;
}

interface Props {
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    foodItem: FoodItem;
    relatedItems: FoodItem[];
    [key: string]: unknown;
}

const dietaryTypes = {
    vegetarian: '🥬 Vegetarian',
    vegan: '🌱 Vegan',
    gluten_free: '🌾 Gluten Free',
    dairy_free: '🥛 Dairy Free',
    none: '🍽️ Regular'
};

export default function FoodItemDetail({ auth, foodItem, relatedItems }: Props) {
    return (
        <>
            <Head title={`${foodItem.name} - Food Catalog`} />
            <FoodNav auth={auth} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-gray-700">🏠 Home</Link>
                        <span>›</span>
                        <Link href={`/?category=${foodItem.category.slug}`} className="hover:text-gray-700">
                            {foodItem.category.name}
                        </Link>
                        <span>›</span>
                        <span className="text-gray-900">{foodItem.name}</span>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Image Placeholder */}
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <div className="text-8xl mb-4">🍽️</div>
                            <p>Image placeholder</p>
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <div className="mb-6">
                            {foodItem.is_featured && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mb-4">
                                    ⭐ Featured Item
                                </span>
                            )}
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{foodItem.name}</h1>
                            <div className="flex items-center space-x-4 mb-4">
                                <span className="text-3xl font-bold text-green-600">${foodItem.price}</span>
                                <span className="text-lg text-gray-600">
                                    {dietaryTypes[foodItem.dietary_type as keyof typeof dietaryTypes]}
                                </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="bg-gray-100 px-3 py-1 rounded-full">{foodItem.category.name}</span>
                                {foodItem.preparation_time && (
                                    <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800">
                                        ⏱️ {foodItem.preparation_time} min
                                    </span>
                                )}
                                <span className={`px-3 py-1 rounded-full ${
                                    foodItem.is_available 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {foodItem.is_available ? '✅ Available' : '❌ Unavailable'}
                                </span>
                            </div>
                        </div>

                        <div className="prose max-w-none mb-8">
                            <p className="text-gray-700 leading-relaxed">{foodItem.description}</p>
                        </div>

                        {/* Ingredients */}
                        {foodItem.ingredients && foodItem.ingredients.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">🥘 Ingredients</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {foodItem.ingredients.map((ingredient, index) => (
                                        <span key={index} className="text-sm bg-gray-50 px-3 py-2 rounded-md">
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Nutritional Information */}
                        {foodItem.nutritional_info && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Nutritional Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(foodItem.nutritional_info).map(([key, value]) => (
                                        <div key={key} className="bg-gray-50 p-3 rounded-md">
                                            <div className="text-sm text-gray-500 capitalize">{key.replace('_', ' ')}</div>
                                            <div className="font-medium text-gray-900">{String(value)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <Link href="/">
                                <Button variant="outline" size="lg">← Back to Catalog</Button>
                            </Link>
                            <Link href={`/?category=${foodItem.category.slug}`}>
                                <Button variant="outline" size="lg">More from {foodItem.category.name}</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Items */}
                {relatedItems.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">🔗 Related Items</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                                            {item.is_featured && (
                                                <span className="text-yellow-500 text-sm">⭐</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                                        
                                        <div className="flex items-center justify-between text-sm mb-3">
                                            <span className="text-gray-500">{dietaryTypes[item.dietary_type as keyof typeof dietaryTypes]}</span>
                                            {item.preparation_time && (
                                                <span className="text-gray-500">{item.preparation_time} min</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-green-600">${item.price}</span>
                                            <Link href={`/food/${item.slug}`}>
                                                <Button size="sm">View Details</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}