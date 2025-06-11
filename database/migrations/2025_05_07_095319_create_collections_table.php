<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollectionsTable extends Migration
{
    public function up()
    {
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('watch_id')->constrained('watches')->onDelete('cascade');
            $table->date('purchase_date');
            $table->date('warranty_end_date');
            $table->string('warranty_image');
            $table->string('selected_strap');
            $table->string('selected_size');
            $table->string('selected_movement');
            $table->timestamps();
            $table->unique(['user_id', 'watch_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('collections');
    }
}
