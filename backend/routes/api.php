<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QuizController;

Route::group(['middleware' => 'guest'], function () {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [UserController::class, 'logout'])->name('logout');

    Route::get('/quiz', [QuizController::class, 'index']);
    Route::post('/quiz/create', [QuizController::class, 'store']);
    Route::put('/quiz/{quizId}/update', [QuizController::class, 'update']);
    Route::delete('/quiz/{quizId}/delete', [QuizController::class, 'delete']);
    Route::get('/quiz/{quizId}', [QuizController::class, 'show']);
});

Route::get('/user', function (Request $request) {
    return $request->user();  // Returns the authenticated user's data
})->middleware('auth:sanctum');

