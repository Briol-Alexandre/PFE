<?php

use App\Http\Controllers\RepairController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/repair/create', [RepairController::class, 'create'])->name('repair.create');

    Route::post('/repair/create', [RepairController::class, 'store'])->name('repair.store');

    Route::get('/repair/{repair}/edit', [RepairController::class, 'edit'])->name('repair.edit');

    Route::patch('/repair/{repair}/edit', [RepairController::class, 'update'])->name('repair.update');

    Route::delete('/repair/{repair}/delete', [RepairController::class, 'destroy'])->name('repair.destroy');

    Route::get('/repair', [RepairController::class, 'index'])->name('repair.index');

    Route::get('/repair/{repair}', [RepairController::class, 'show'])->name('repair.show');

    Route::get('/repair/{repair}/creator', [RepairController::class, 'show_creator'])->name('repair.show_creator');

    Route::get('/repair/{repair}/edit_estimate', [RepairController::class, 'edit_estimate'])->name('repair.edit_estimate');

    Route::patch('/repair/{repair}/edit_estimate', [RepairController::class, 'update_estimate'])->name('repair.update_estimate');

    Route::get('/repair/{repair}/accept', [RepairController::class, 'accept'])->name('repair.accept');

    Route::get('/repair/{repair}/refuse', [RepairController::class, 'refuse_user'])->name('repair.refuse_user');

    Route::patch('/repair/{repair}/refuse_creator', [RepairController::class, 'refuse_creator'])->name('repair.refuse_creator');

    Route::get('/repair/{repair}/completed', [RepairController::class, 'completed'])->name('repair.completed');

    Route::get('/repair/{repair}/modify_price_and_date', [RepairController::class, 'modify_price_and_date'])->name('repair.modify_price_and_date');

    Route::patch('/repair/{repair}/update_price_and_date', [RepairController::class, 'update_price_and_date'])->name('repair.update_price_and_date');

    Route::get('/repair/{repair}/start', [RepairController::class, 'start'])->name('repair.start');

});

