import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export function FoodNav({ auth }: Props) {
    return (
        <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="flex items-center space-x-3 hover:opacity-80">
                        <div className="text-2xl">🍽️</div>
                        <h1 className="text-xl font-bold text-gray-900">FoodCatalog</h1>
                    </Link>
                    
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm">🏠 Home</Button>
                        </Link>
                        
                        {auth?.user ? (
                            <>
                                <Link href="/dashboard">
                                    <Button variant="ghost" size="sm">📊 Dashboard</Button>
                                </Link>
                                <Link href="/admin/food-items">
                                    <Button variant="default" size="sm">🛠️ Admin</Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">🔑 Login</Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="default" size="sm">👤 Register</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}