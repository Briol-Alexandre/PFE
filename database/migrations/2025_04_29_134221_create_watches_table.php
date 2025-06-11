<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('watches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('model');
            $table->json('available_movements')->nullable(); // Mouvements disponibles
            $table->string('selected_movement')->nullable(); // Mouvement sélectionné par l'utilisateur
            $table->string('image')->nullable();
            $table->json('available_straps')->nullable(); // Bracelets disponibles
            $table->json('available_sizes')->nullable(); // Tailles de cadran disponibles
            $table->string('selected_strap')->nullable(); // Bracelet sélectionné par l'utilisateur
            $table->string('selected_size')->nullable(); // Taille sélectionnée par l'utilisateur
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('watches');
    }
};
