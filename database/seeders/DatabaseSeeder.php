<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\FoodItem;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create categories with specific names and sort orders
        $categories = [
            ['name' => 'Appetizers', 'sort_order' => 1],
            ['name' => 'Main Courses', 'sort_order' => 2],
            ['name' => 'Pizza', 'sort_order' => 3],
            ['name' => 'Pasta', 'sort_order' => 4],
            ['name' => 'Salads', 'sort_order' => 5],
            ['name' => 'Desserts', 'sort_order' => 6],
            ['name' => 'Beverages', 'sort_order' => 7],
            ['name' => 'Vegetarian', 'sort_order' => 8],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create([
                'name' => $categoryData['name'],
                'slug' => \Illuminate\Support\Str::slug($categoryData['name']),
                'description' => 'Delicious ' . strtolower($categoryData['name']) . ' prepared with fresh ingredients.',
                'is_active' => true,
                'sort_order' => $categoryData['sort_order'],
            ]);

            // Create 3-5 food items per category
            FoodItem::factory(random_int(3, 5))->create([
                'category_id' => $category->id,
            ]);
        }

        // Create some featured items
        FoodItem::factory(5)->featured()->create();
    }
}