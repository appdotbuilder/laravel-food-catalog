<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Category>
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Appetizers',
            'Main Courses',
            'Desserts',
            'Beverages',
            'Salads',
            'Soups',
            'Seafood',
            'Vegetarian',
            'Pizza',
            'Pasta',
            'Grilled Items',
            'Sandwiches'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->sentence(10),
            'image' => null,
            'is_active' => fake()->boolean(90),
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the category is inactive.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function inactive(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => false,
            ];
        });
    }
}