<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreFoodItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->name),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:food_items,slug',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|string|max:255',
            'ingredients' => 'nullable|array',
            'ingredients.*' => 'string|max:255',
            'nutritional_info' => 'nullable|array',
            'dietary_type' => 'required|in:vegetarian,vegan,gluten_free,dairy_free,none',
            'is_available' => 'boolean',
            'is_featured' => 'boolean',
            'preparation_time' => 'nullable|integer|min:0',
            'category_id' => 'required|exists:categories,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Food item name is required.',
            'name.max' => 'Food item name must not exceed 255 characters.',
            'slug.unique' => 'A food item with this name already exists.',
            'description.required' => 'Description is required.',
            'price.required' => 'Price is required.',
            'price.numeric' => 'Price must be a valid number.',
            'price.min' => 'Price must be at least 0.',
            'dietary_type.required' => 'Dietary type is required.',
            'dietary_type.in' => 'Please select a valid dietary type.',
            'preparation_time.integer' => 'Preparation time must be a number.',
            'preparation_time.min' => 'Preparation time must be at least 0.',
            'category_id.required' => 'Category is required.',
            'category_id.exists' => 'Please select a valid category.',
        ];
    }
}