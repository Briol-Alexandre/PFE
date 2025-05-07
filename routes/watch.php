<?php

use App\Http\Controllers\WatchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/watch/create', function () {
        return Inertia::render('Watch/Create');
    })->name('watch.create');

    Route::post('/watch/create', [WatchController::class, 'store'])->name('watch.store');

    Route::get('/watch/{watch}', [WatchController::class, 'show'])->name('watch.show');

    Route::get('/watch', [WatchController::class, 'index'])->name('watch.index');

    Route::post('/watch/{watch}/update', [WatchController::class, 'update'])->name('watch.update');

    Route::get('/watch/{watch}/edit', [WatchController::class, 'edit'])->name('watch.edit');

    Route::delete('/watch/{watch}/delete', [WatchController::class, 'destroy'])->name('watch.destroy');
});
