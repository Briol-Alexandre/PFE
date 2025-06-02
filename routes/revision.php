<?php

use App\Http\Controllers\RevisionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/revisions', [RevisionController::class, 'index'])->name('revision.index');

    Route::get('/revision/create', [RevisionController::class, 'create'])->name('revision.create');
    Route::post('/revision/create', [RevisionController::class, 'store'])->name('revision.store');

    Route::get('/revision/{revision}/edit', [RevisionController::class, 'edit'])->name('revision.edit');
    Route::patch('/revision/{revision}/edit', [RevisionController::class, 'update'])->name('revision.update');

    Route::delete('/revision/{revision}', [RevisionController::class, 'destroy'])->name('revision.destroy');


});

