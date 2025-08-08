<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\FoodItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FoodCatalogController extends Controller
{
    /**
     * Display the food catalog.
     */
    public function index(Request $request)
    {
        // If no food items exist yet, show welcome page
        if (FoodItem::count() === 0) {
            return Inertia::render('welcome');
        }
        $query = FoodItem::with('category')
            ->available()
            ->orderBy('is_featured', 'desc')
            ->orderBy('name');

        // Search functionality
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Filter by dietary type
        if ($request->filled('dietary')) {
            $query->where('dietary_type', $request->dietary);
        }

        $foodItems = $query->paginate(12);
        
        $categories = Category::active()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        $featuredItems = FoodItem::with('category')
            ->available()
            ->featured()
            ->limit(6)
            ->get();

        return Inertia::render('food-catalog', [
            'foodItems' => $foodItems,
            'categories' => $categories,
            'featuredItems' => $featuredItems,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'dietary' => $request->dietary,
            ]
        ]);
    }

    /**
     * Display a specific food item.
     */
    public function show(FoodItem $foodItem)
    {
        $foodItem->load('category');
        
        // Get related items from the same category
        $relatedItems = FoodItem::with('category')
            ->available()
            ->where('category_id', $foodItem->category_id)
            ->where('id', '!=', $foodItem->id)
            ->limit(4)
            ->get();

        return Inertia::render('food-item', [
            'foodItem' => $foodItem,
            'relatedItems' => $relatedItems,
        ]);
    }
}