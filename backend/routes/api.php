<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\VaccinationController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

Route::middleware(AuthMiddleware::class)->group(function () {
    Route::post('consultations', [ConsultationController::class, 'requestConsultation']);
    Route::get('consultations', [ConsultationController::class, 'getConsultation']);

    Route::get('spots', [VaccinationController::class, 'getSpots']);
    Route::get('spots/{id}', [VaccinationController::class, 'showSpots']);

    Route::post('vaccinations', [VaccinationController::class, 'requestVaccination']);
    Route::get('vaccinations', [VaccinationController::class, 'getVaccination']);
});
