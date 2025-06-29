<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CollectionStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'purchase_date' => 'required|date',
            'warranty_end_date' => 'required|date',
            'watch_id' => 'required|exists:watches,id',
            'user_id' => 'required|exists:users,id',
            'warranty_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2000',
            'selected_strap' => 'required|string',
            'selected_size' => 'required|string',
            'selected_movement' => 'required|string',
        ];
    }
}
