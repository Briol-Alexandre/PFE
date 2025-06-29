<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Revisions;
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
            'name' => 'Doe',
            'first_name' => 'John',
            'email' => 'watchout.maintenance@gmail.com',
            'role' => User::ROLE_CREATOR,
        ]);

        User::factory()->create([
            'name' => '',
            'first_name' => 'Admin',
            'email' => 'admin@domain.com',
            'role' => User::ROLE_CREATOR,
        ]);

        User::factory()->create([
            'name' => '',
            'first_name' => 'User',
            'email' => 'user@domain.com',
            'role' => User::ROLE_USER,
        ]);

        Revisions::factory()->createMany([
            [
                'type' => 'bracelet',
                'name' => 'Changement du bracelet',
            ],
            [
                'type' => 'glass',
                'name' => 'Remplacement de la vitre',
            ],
            [
                'type' => 'redirection',
                'name' => 'Réaiguillage complet',
            ],
            [
                'type' => 'regular_maintenance',
                'name' => 'Entretien régulier',
            ],
            [
                'type' => 'battery',
                'name' => 'Changement de la batterie (uniquement pour les montres à mouvement quartz)',
            ],
        ]);


    }
}
