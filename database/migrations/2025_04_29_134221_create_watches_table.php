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
            $table->json('available_movements')->nullable();
            $table->string('selected_movement')->nullable();
            $table->string('image')->nullable();
            $table->json('available_straps')->nullable();
            $table->json('available_sizes')->nullable();
            $table->string('selected_strap')->nullable();
            $table->string('selected_size')->nullable();
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
