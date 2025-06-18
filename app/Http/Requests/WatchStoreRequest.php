<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class WatchStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'model' => 'required|string|max:255',
            'available_movements' => 'required|string',
            'selected_movement' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2000',
            'user_id' => 'required|exists:users,id',
            'available_straps' => 'required|string',
            'available_sizes' => 'required|string',
        ];
    }
}
