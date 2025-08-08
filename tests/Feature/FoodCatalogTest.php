<?php

use App\Models\Category;
use App\Models\FoodItem;
use App\Models\User;

test('home page shows welcome when no food items', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('welcome'));
});

test('home page shows food catalog when items exist', function () {
    $category = Category::factory()->create();
    FoodItem::factory()->create([
        'category_id' => $category->id,
        'is_available' => true
    ]);

    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('food-catalog'));
});

test('can view food item details', function () {
    $category = Category::factory()->create();
    $foodItem = FoodItem::factory()->create([
        'category_id' => $category->id,
        'is_available' => true
    ]);

    $response = $this->get("/food/{$foodItem->slug}");

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('food-item')
        ->has('foodItem')
        ->where('foodItem.name', $foodItem->name)
    );
});

test('can search food items', function () {
    $category = Category::factory()->create();
    $pizza = FoodItem::factory()->create([
        'name' => 'Margherita Pizza',
        'category_id' => $category->id,
        'is_available' => true
    ]);
    $burger = FoodItem::factory()->create([
        'name' => 'Beef Burger',
        'category_id' => $category->id,
        'is_available' => true
    ]);

    $response = $this->get('/?search=pizza');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('food-catalog')
        ->has('foodItems.data', 1)
        ->where('foodItems.data.0.name', 'Margherita Pizza')
    );
});

test('can filter by category', function () {
    $appetizers = Category::factory()->create(['name' => 'Appetizers', 'slug' => 'appetizers']);
    $mains = Category::factory()->create(['name' => 'Main Courses', 'slug' => 'main-courses']);
    
    $appetizer = FoodItem::factory()->create([
        'category_id' => $appetizers->id,
        'is_available' => true
    ]);
    $main = FoodItem::factory()->create([
        'category_id' => $mains->id,
        'is_available' => true
    ]);

    $response = $this->get('/?category=appetizers');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('food-catalog')
        ->has('foodItems.data', 1)
        ->where('foodItems.data.0.category.name', 'Appetizers')
    );
});

test('authenticated users can access admin', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();

    $response = $this->actingAs($user)->get('/admin/food-items');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('admin/food-items/index'));
});

test('guest users cannot access admin', function () {
    $response = $this->get('/admin/food-items');

    $response->assertStatus(302);
    $response->assertRedirect('/login');
});