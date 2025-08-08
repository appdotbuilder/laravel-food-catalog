import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FoodNav } from '@/components/food-nav';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    sort_order: number;
}

interface FoodItem {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string | null;
    ingredients: string[] | null;
    dietary_type: string;
    is_available: boolean;
    is_featured: boolean;
    preparation_time: number | null;
    category: Category;
}

interface Filters {
    search: string | null;
    category: string | null;
    dietary: string | null;
}

interface Props {
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    foodItems: {
        data: FoodItem[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            total: number;
            last_page: number;
        };
    };
    categories: Category[];
    featuredItems: FoodItem[];
    filters: Filters;
    [key: string]: unknown;
}

const dietaryTypes = {
    vegetarian: '🥬 Vegetarian',
    vegan: '🌱 Vegan',
    gluten_free: '🌾 Gluten Free',
    dairy_free: '🥛 Dairy Free',
    none: '🍽️ Regular'
};

export default function FoodCatalog({ auth, foodItems, categories, featuredItems, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedDietary, setSelectedDietary] = useState(filters.dietary || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/', {
            search: searchQuery || undefined,
            category: selectedCategory || undefined,
            dietary: selectedDietary || undefined,
        }, {
            preserveState: true,
        });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedDietary('');
        router.get('/');
    };

    return (
        <>
            <Head title="Food Catalog" />
            <FoodNav auth={auth} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">🍽️ Food Catalog</h1>
                    <p className="text-lg text-gray-600">
                        Discover delicious food items from our carefully curated menu
                    </p>
                </div>

                {/* Featured Items */}
                {featuredItems.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">⭐ Featured Items</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-yellow-200">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                            <span className="text-lg font-bold text-green-600">${item.price}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                            <span className="bg-gray-100 px-2 py-1 rounded">{item.category.name}</span>
                                            <span>{dietaryTypes[item.dietary_type as keyof typeof dietaryTypes]}</span>
                                        </div>
                                        <Link href={`/food/${item.slug}`}>
                                            <Button size="sm" className="w-full">View Details</Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">🔍 Search</label>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search food items..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">🏷️ Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.slug}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Dietary Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">🥗 Dietary</label>
                                <select
                                    value={selectedDietary}
                                    onChange={(e) => setSelectedDietary(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">All Types</option>
                                    {Object.entries(dietaryTypes).map(([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                                <Button type="submit" className="flex-1">Filter</Button>
                                <Button type="button" variant="outline" onClick={clearFilters}>Clear</Button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Food Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {foodItems.data.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition-shadow">
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                                    {item.is_featured && (
                                        <span className="text-yellow-500 text-sm">⭐</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Category:</span>
                                        <span className="text-gray-900">{item.category.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Type:</span>
                                        <span className="text-gray-900">{dietaryTypes[item.dietary_type as keyof typeof dietaryTypes]}</span>
                                    </div>
                                    {item.preparation_time && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Prep Time:</span>
                                            <span className="text-gray-900">{item.preparation_time} min</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-green-600">${item.price}</span>
                                    <Link href={`/food/${item.slug}`}>
                                        <Button size="sm">View Details</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {foodItems.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No food items found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search criteria or clearing all filters</p>
                        <Button onClick={clearFilters}>Clear All Filters</Button>
                    </div>
                )}

                {/* Pagination */}
                {foodItems.meta.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {foodItems.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-2 text-sm rounded ${
                                    link.active
                                        ? 'bg-orange-600 text-white'
                                        : link.url
                                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}