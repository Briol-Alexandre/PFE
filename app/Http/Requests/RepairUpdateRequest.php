<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RepairUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'collection_id' => 'required|exists:App\Models\Collection,id',
            'revisions' => 'required|array',
            'revisions.*.id' => 'required|exists:App\Models\Revisions,id',
            'revisions.*.name' => 'required|string',
            'date' => 'nullable',
            'price' => 'nullable'
        ];
    }
}
