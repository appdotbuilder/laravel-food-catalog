import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    sort_order: number;
    food_items_count: number;
    created_at: string;
}

interface Props {
    categories: {
        data: Category[];
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

export default function CategoriesIndex({ categories }: Props) {
    const handleDelete = (category: Category) => {
        if (category.food_items_count > 0) {
            alert(`Cannot delete "${category.name}" because it contains ${category.food_items_count} food items. Please move or delete the food items first.`);
            return;
        }
        
        if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
            router.delete(`/admin/categories/${category.id}`);
        }
    };

    return (
        <AppShell>
            <Head title="Manage Categories - Admin" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🏷️ Categories</h1>
                        <p className="text-gray-600 mt-1">Organize your food items into categories</p>
                    </div>
                    <div className="flex space-x-4">
                        <Link href="/admin/food-items">
                            <Button variant="outline">🍽️ Manage Food Items</Button>
                        </Link>
                        <Link href="/admin/categories/create">
                            <Button>➕ Add Category</Button>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-blue-600">{categories.meta.total}</div>
                        <div className="text-sm text-gray-500">Total Categories</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-green-600">
                            {categories.data.filter(cat => cat.is_active).length}
                        </div>
                        <div className="text-sm text-gray-500">Active</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-orange-600">
                            {categories.data.reduce((sum, cat) => sum + cat.food_items_count, 0)}
                        </div>
                        <div className="text-sm text-gray-500">Total Food Items</div>
                    </div>
                </div>

                {/* Categories Table */}
                <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Items
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sort Order
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.data.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-3xl mr-4">🏷️</div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                                    <div className="text-sm text-gray-500">/{category.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs line-clamp-2">
                                                {category.description || 'No description'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {category.food_items_count} items
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                category.is_active 
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {category.is_active ? '✅ Active' : '❌ Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900">{category.sort_order}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link href={`/?category=${category.slug}`} target="_blank">
                                                    <Button variant="ghost" size="sm">👁️ View</Button>
                                                </Link>
                                                <Link href={`/admin/categories/${category.id}/edit`}>
                                                    <Button variant="ghost" size="sm">✏️ Edit</Button>
                                                </Link>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => handleDelete(category)}
                                                    className="text-red-600 hover:text-red-700"
                                                    disabled={category.food_items_count > 0}
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
                {categories.data.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                        <div className="text-6xl mb-4">🏷️</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
                        <p className="text-gray-600 mb-4">Create categories to organize your food items</p>
                        <Link href="/admin/categories/create">
                            <Button>➕ Add First Category</Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {categories.meta.last_page > 1 && (
                    <div className="flex justify-center space-x-2 mt-8">
                        {categories.links.map((link, index) => (
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