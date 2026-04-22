<?php

use App\Http\Controllers\Api\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('dashboard')->group(function () {
    Route::get('overview', [DashboardController::class, 'overview']);
    Route::get('revenue', [DashboardController::class, 'revenue']);
    Route::get('service-mix', [DashboardController::class, 'serviceMix']);
    Route::get('projects', [DashboardController::class, 'projects']);
    Route::get('leads', [DashboardController::class, 'leads']);
    Route::get('activity', [DashboardController::class, 'activity']);
});
