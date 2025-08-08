<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\FoodItem;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FoodItem>
 */
class FoodItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\FoodItem>
     */
    protected $model = FoodItem::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $foods = [
            'Caesar Salad', 'Grilled Chicken', 'Beef Burger', 'Margherita Pizza',
            'Chocolate Cake', 'Fish and Chips', 'Pasta Carbonara', 'Tomato Soup',
            'Greek Salad', 'Ribeye Steak', 'Mushroom Risotto', 'Apple Pie',
            'Chicken Wings', 'Tuna Sandwich', 'Vegetable Curry', 'Cheesecake',
            'BBQ Ribs', 'Caprese Salad', 'Salmon Fillet', 'Tiramisu'
        ];

        $ingredients = [
            ['chicken', 'lettuce', 'tomato', 'cheese'],
            ['beef', 'onion', 'garlic', 'herbs'],
            ['flour', 'eggs', 'butter', 'sugar'],
            ['fish', 'potatoes', 'oil', 'lemon'],
            ['vegetables', 'spices', 'herbs', 'oil']
        ];

        $nutritionalInfo = [
            'calories' => fake()->numberBetween(200, 800),
            'protein' => fake()->numberBetween(10, 50) . 'g',
            'carbs' => fake()->numberBetween(20, 80) . 'g',
            'fat' => fake()->numberBetween(5, 30) . 'g',
        ];

        $name = fake()->randomElement($foods);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->paragraph(3),
            'price' => fake()->randomFloat(2, 8.99, 49.99),
            'image' => null,
            'ingredients' => fake()->randomElement($ingredients),
            'nutritional_info' => $nutritionalInfo,
            'dietary_type' => fake()->randomElement(['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'none']),
            'is_available' => fake()->boolean(85),
            'is_featured' => fake()->boolean(20),
            'preparation_time' => fake()->numberBetween(15, 45),
            'category_id' => Category::factory(),
        ];
    }

    /**
     * Indicate that the food item is featured.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function featured(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'is_featured' => true,
            ];
        });
    }

    /**
     * Indicate that the food item is unavailable.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unavailable(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'is_available' => false,
            ];
        });
    }
}