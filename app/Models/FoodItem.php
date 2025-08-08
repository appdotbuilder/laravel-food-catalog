<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\FoodItem
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string $description
 * @property float $price
 * @property string|null $image
 * @property array|null $ingredients
 * @property array|null $nutritional_info
 * @property string $dietary_type
 * @property bool $is_available
 * @property bool $is_featured
 * @property int|null $preparation_time
 * @property int $category_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereDietaryType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereIngredients($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereIsAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereNutritionalInfo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem wherePreparationTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem available()
 * @method static \Illuminate\Database\Eloquent\Builder|FoodItem featured()
 * @method static \Database\Factories\FoodItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class FoodItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'image',
        'ingredients',
        'nutritional_info',
        'dietary_type',
        'is_available',
        'is_featured',
        'preparation_time',
        'category_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'ingredients' => 'array',
        'nutritional_info' => 'array',
        'is_available' => 'boolean',
        'is_featured' => 'boolean',
        'preparation_time' => 'integer',
        'category_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the category that owns the food item.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Scope a query to only include available food items.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    /**
     * Scope a query to only include featured food items.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}