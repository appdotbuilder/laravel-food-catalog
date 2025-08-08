<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFoodItemRequest;
use App\Http\Requests\UpdateFoodItemRequest;
use App\Models\Category;
use App\Models\FoodItem;
use Inertia\Inertia;

class FoodItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foodItems = FoodItem::with('category')
            ->orderBy('name')
            ->paginate(10);
        
        return Inertia::render('admin/food-items/index', [
            'foodItems' => $foodItems
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::active()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();
            
        return Inertia::render('admin/food-items/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFoodItemRequest $request)
    {
        $foodItem = FoodItem::create($request->validated());

        return redirect()->route('admin.food-items.show', $foodItem)
            ->with('success', 'Food item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(FoodItem $foodItem)
    {
        $foodItem->load('category');
        
        return Inertia::render('admin/food-items/show', [
            'foodItem' => $foodItem
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FoodItem $foodItem)
    {
        $foodItem->load('category');
        
        $categories = Category::active()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();
            
        return Inertia::render('admin/food-items/edit', [
            'foodItem' => $foodItem,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFoodItemRequest $request, FoodItem $foodItem)
    {
        $foodItem->update($request->validated());

        return redirect()->route('admin.food-items.show', $foodItem)
            ->with('success', 'Food item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FoodItem $foodItem)
    {
        $foodItem->delete();

        return redirect()->route('admin.food-items.index')
            ->with('success', 'Food item deleted successfully.');
    }
}