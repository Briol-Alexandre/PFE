<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WatchUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'model' => 'sometimes|string|max:255',
            'movement' => 'sometimes|string|max:255',
            'available_straps' => 'sometimes|nullable|string',
            'available_sizes' => 'sometimes|nullable|string',
            'user_id' => 'sometimes|exists:users,id',
        ];

        if ($this->hasFile('image')) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg,gif,svg|max:2048';
        }

        return $rules;
    }
}
