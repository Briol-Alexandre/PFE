<?php

namespace Database\Factories;

use App\Models\Collection;
use App\Models\User;
use App\Models\Watch;
use Illuminate\Database\Eloquent\Factories\Factory;

class CollectionFactory extends Factory
{
    protected $model = Collection::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'watch_id' => Watch::factory(),
            'purchase_date' => $this->faker->date(),
            'warranty_end_date' => $this->faker->date()
        ];
    }
}
