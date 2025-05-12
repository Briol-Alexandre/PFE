<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Watch>
 */
class WatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'model' => fake()->words(3, true),
            'movement' => fake()->randomElement(['quartz', 'automatique']),
            'image' => 'img/watches/default.jpg',
            'user_id' => User::factory()->create(['role' => 'creator'])->id,
        ];
    }
}
