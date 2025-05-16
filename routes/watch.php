<?php

use App\Http\Controllers\WatchController;
use App\Http\Middleware\CreatorMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['web', 'auth'])->group(function () {
    // Routes publiques


    // Routes creators
    Route::middleware(CreatorMiddleware::class)->group(function () {
        Route::get('/watch/create', [WatchController::class, 'create'])->name('watch.create');

        Route::post('/watch/create', [WatchController::class, 'store'])->name('watch.store');

        Route::get('/watch/{watch}/edit', [WatchController::class, 'edit'])->name('watch.edit');

        Route::put('/watch/{watch}/update', [WatchController::class, 'update'])->name('watch.update');

        Route::delete('/watch/{watch}/delete', [WatchController::class, 'destroy'])->name('watch.destroy');

        Route::get('/watch', [WatchController::class, 'index'])->name('watch.index');

        Route::get('/watch/{watch}', [WatchController::class, 'show'])->name('watch.show');

    });


});
