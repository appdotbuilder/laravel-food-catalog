<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FoodCatalogController;
use App\Http\Controllers\FoodItemController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Food catalog routes (public)
Route::get('/', [FoodCatalogController::class, 'index'])->name('home');
Route::get('/food/{foodItem:slug}', [FoodCatalogController::class, 'show'])->name('food.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Admin routes for managing food items and categories
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('categories', CategoryController::class);
        Route::resource('food-items', FoodItemController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
