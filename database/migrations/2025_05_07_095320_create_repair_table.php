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
            $table->dateTime('date')->nullable();
            $table->integer('price')->nullable();
            $table->string('refuse_reason')->nullable();
            $table->enum('status', ['asked', 'pending', 'accepted', 'in_progress', 'completed', 'rejected'])->default('asked');
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
