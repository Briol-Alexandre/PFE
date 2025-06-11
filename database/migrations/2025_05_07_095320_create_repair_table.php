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
        Schema::create('repairs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('collection_id')->constrained()->cascadeOnDelete();
            $table->json('revisions')->nullable();
            $table->longText('description');
            $table->json('proposed_dates')->nullable(); // Les dates proposées par l'horloger
            $table->dateTime('date')->nullable(); // La date choisie par l'utilisateur
            $table->integer('price')->nullable();
            $table->string('refuse_reason')->nullable();
            $table->string('modify_reason')->nullable();
            $table->enum('status', ['asked', 'pending', 'accepted', 'modified', 'in_progress', 'completed', 'rejected'])->default('asked');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repairs');
    }
};
