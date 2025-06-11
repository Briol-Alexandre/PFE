<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CollectionUpdateRequest extends FormRequest
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
            'selected_strap' => 'required|string',
            'selected_size' => 'required|string',
            'selected_movement' => 'required|string',
        ];
    }
}
