<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('food_items', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Food item name');
            $table->string('slug')->unique()->comment('URL-friendly food item name');
            $table->text('description')->comment('Food item description');
            $table->decimal('price', 8, 2)->comment('Food item price');
            $table->string('image')->nullable()->comment('Food item image path');
            $table->json('ingredients')->nullable()->comment('List of ingredients');
            $table->json('nutritional_info')->nullable()->comment('Nutritional information');
            $table->enum('dietary_type', ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'none'])->default('none')->comment('Dietary restrictions');
            $table->boolean('is_available')->default(true)->comment('Whether item is available');
            $table->boolean('is_featured')->default(false)->comment('Whether item is featured');
            $table->integer('preparation_time')->nullable()->comment('Preparation time in minutes');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('slug');
            $table->index('category_id');
            $table->index('is_available');
            $table->index('is_featured');
            $table->index('dietary_type');
            $table->index(['is_available', 'is_featured']);
            $table->index(['category_id', 'is_available']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food_items');
    }
};