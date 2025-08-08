import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface FoodItem {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    dietary_type: string;
    is_available: boolean;
    is_featured: boolean;
    preparation_time: number | null;
    category: Category;
    created_at: string;
}

interface Props {
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
    [key: string]: unknown;
}

const dietaryTypes = {
    vegetarian: '🥬 Vegetarian',
    vegan: '🌱 Vegan',
    gluten_free: '🌾 Gluten Free',
    dairy_free: '🥛 Dairy Free',
    none: '🍽️ Regular'
};

export default function FoodItemsIndex({ foodItems }: Props) {
    const handleDelete = (foodItem: FoodItem) => {
        if (confirm(`Are you sure you want to delete "${foodItem.name}"?`)) {
            router.delete(`/admin/food-items/${foodItem.id}`);
        }
    };

    return (
        <AppShell>
            <Head title="Manage Food Items - Admin" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🍽️ Food Items</h1>
                        <p className="text-gray-600 mt-1">Manage your food catalog items</p>
                    </div>
                    <div className="flex space-x-4">
                        <Link href="/admin/categories">
                            <Button variant="outline">🏷️ Manage Categories</Button>
                        </Link>
                        <Link href="/admin/food-items/create">
                            <Button>➕ Add Food Item</Button>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-blue-600">{foodItems.meta.total}</div>
                        <div className="text-sm text-gray-500">Total Items</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-green-600">
                            {foodItems.data.filter(item => item.is_available).length}
                        </div>
                        <div className="text-sm text-gray-500">Available</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-yellow-600">
                            {foodItems.data.filter(item => item.is_featured).length}
                        </div>
                        <div className="text-sm text-gray-500">Featured</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-red-600">
                            {foodItems.data.filter(item => !item.is_available).length}
                        </div>
                        <div className="text-sm text-gray-500">Unavailable</div>
                    </div>
                </div>

                {/* Food Items Table */}
                <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Food Item
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {foodItems.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-4xl mr-4">🍽️</div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                    <div className="text-sm text-gray-500 line-clamp-1">
                                                        {item.description.substring(0, 60)}...
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs text-gray-500">
                                                            {dietaryTypes[item.dietary_type as keyof typeof dietaryTypes]}
                                                        </span>
                                                        {item.preparation_time && (
                                                            <span className="text-xs text-gray-500">
                                                                • {item.preparation_time} min
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {item.category.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-green-600">${item.price}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-1">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    item.is_available 
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {item.is_available ? '✅ Available' : '❌ Unavailable'}
                                                </span>
                                                {item.is_featured && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        ⭐ Featured
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link href={`/food/${item.slug}`} target="_blank">
                                                    <Button variant="ghost" size="sm">👁️ View</Button>
                                                </Link>
                                                <Link href={`/admin/food-items/${item.id}/edit`}>
                                                    <Button variant="ghost" size="sm">✏️ Edit</Button>
                                                </Link>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => handleDelete(item)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    🗑️ Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {foodItems.data.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No food items yet</h3>
                        <p className="text-gray-600 mb-4">Get started by adding your first food item</p>
                        <Link href="/admin/food-items/create">
                            <Button>➕ Add First Food Item</Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {foodItems.meta.last_page > 1 && (
                    <div className="flex justify-center space-x-2 mt-8">
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
        </AppShell>
    );
}