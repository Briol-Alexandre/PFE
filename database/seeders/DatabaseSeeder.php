<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Briol',
            'first_name' => 'Alexandre',
            'email' => 'alexandre.briol@gmail.com',
            'role' => User::ROLE_USER,
        ]);

        User::factory()->create([
            'name' => 'Col&MacArthur',
            'first_name' => 'Creator',
            'email' => 'test@colmacarthur.com',
            'role' => User::ROLE_CREATOR,
        ]);
    }
}
