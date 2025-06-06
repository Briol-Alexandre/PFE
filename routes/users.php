<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\CreatorMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['web', 'auth'])->group(function () {
    // Routes creators
    Route::middleware(CreatorMiddleware::class)->group(function () {
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');

        Route::post('/users/create', [UserController::class, 'store'])->name('users.store');

        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');

        Route::put('/users/{user}/update', [UserController::class, 'update'])->name('users.update');

        Route::delete('/users/{user}/delete', [UserController::class, 'destroy'])->name('users.destroy');

        Route::get('/users', [UserController::class, 'index'])->name('users.index');

        Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');

    });


});
