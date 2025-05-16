<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RepairUpdateEstimateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'date' => 'nullable|date_format:Y-m-d\TH:i',
            'price' => 'nullable|integer|min:0',
            'status' => 'required|string|in:pending,accepted,in_progress,completed,rejected',
            'refuse_reason' => 'required|string'
        ];
    }
}
