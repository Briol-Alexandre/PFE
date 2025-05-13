<?php

namespace Database\Factories;

use App\Models\Repair;
use App\Models\Collection;
use Illuminate\Database\Eloquent\Factories\Factory;

class RepairFactory extends Factory
{
    protected $model = Repair::class;

    public function definition(): array
    {
        return [
            'collection_id' => Collection::factory(),
            'revisions' => [],
            'date' => null,
            'price' => null
        ];
    }
}
