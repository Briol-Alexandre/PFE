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
            'proposed_dates' => 'required_if:status,pending|array|min:1|max:3',
            'proposed_dates.*' => 'required|date|after:now',
            'date' => 'required_if:status,accepted|date|after:now',
            'price' => 'required_if:status,pending|integer|min:0',
            'status' => 'required|string|in:pending,modified,accepted,in_progress,completed,rejected',
            'refuse_reason' => 'nullable|string',
            'modify_reason' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'proposed_dates.required_if' => 'Vous devez proposer au moins une date.',
            'proposed_dates.min' => 'Vous devez proposer au moins une date.',
            'proposed_dates.max' => 'Vous ne pouvez pas proposer plus de 3 dates.',
            'proposed_dates.*.required' => 'Chaque date proposée doit être renseignée.',
            'proposed_dates.*.date' => 'Le format de la date est invalide.',
            'proposed_dates.*.after' => 'Les dates proposées doivent être dans le futur.',
            'price.required_if' => 'Le prix est requis pour proposer un devis.',
            'price.integer' => 'Le prix doit être un nombre entier.',
            'price.min' => 'Le prix ne peut pas être négatif.',
        ];
    }
}
