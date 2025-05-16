<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RepairStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'collection_id' => 'required|exists:App\Models\Collection,id',
            'revision_ids' => 'required|array',
            'revision_ids.*' => 'exists:App\Models\Revisions,id',
            'description' => 'required|string',
            'date' => 'nullable|date_format:Y-m-d\TH:i',
            'price' => 'nullable|integer|min:0',
            'refuse_reason' => 'nullable|string',
            'status' => 'required|in:asked,pending,accepted,in_progress,completed,rejected'
        ];
    }
}
