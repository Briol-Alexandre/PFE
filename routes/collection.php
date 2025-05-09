<?php

use App\Http\Controllers\CollectionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/collection/create', [CollectionController::class, 'create'])->name('collection.create');
    Route::post('/collection/create', [CollectionController::class, 'store'])->name('collection.store');
    Route::get('/collection/{collection}/edit', [CollectionController::class, 'edit'])->name('collection.edit');
    Route::patch('/collection/{collection}/update', [CollectionController::class, 'update'])->name('collection.update');
    Route::delete('/collection/{collection}/delete', [CollectionController::class, 'destroy'])->name('collection.destroy');
    Route::get('/collection', [CollectionController::class, 'index'])->name('collection.index');
    Route::get('/collection/{collection}', [CollectionController::class, 'show'])->name('collection.show');
});
