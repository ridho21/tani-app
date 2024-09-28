<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\dashboardcontroller;
use App\Http\Controllers\HasilController;
use App\Http\Controllers\KelompokController;
use App\Http\Controllers\LuasController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserKelompokController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {

    return redirect("/dashboard");
})->middleware(["auth", "verified"]);

Route::get('/dashboard', [dashboardcontroller::class, "index"])->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/kelompok', [KelompokController::class, 'tunjukkan'])->middleware(['auth', "verified",'admin']) ->name('kelompok');


Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    

    Route::resource("/kelompok", KelompokController::class);
    Route::resource("/users", UserController::class);

    Route::get("/berita/{berita}/edit", [BeritaController::class, "edit"]);
    Route::put("/berita/{berita}", [BeritaController::class, "update"]);
    Route::delete("/berita/{berita}", [BeritaController::class, "destroy"]);
    Route::resource("/berita", BeritaController::class);

    Route::get("/kelompok/{kelompok}/agenda", [AgendaController::class, "index"]);
    Route::get("/kelompok/{kelompok}/agenda/create", [AgendaController::class, "create"]);
    Route::get("/kelompok/{kelompok}/agenda/{agenda}", [AgendaController::class, "edit"]);
    Route::post("/kelompok/{kelompok}/agenda", [AgendaController::class, "store"]);
    Route::put("/kelompok/{kelompok}/agenda/{agenda}", [AgendaController::class, "update"]);
    Route::delete("/kelompok/{kelompok}/agenda/{agenda}", [AgendaController::class, "destroy"]);

    Route::get('/kelompok/{kelompok}', [HasilController::class, 'show']);
    Route::get('/kelompok/{kelompok}/user', [KelompokController::class, 'detailuser']);
    Route::put('/kelompok/{kelompok}/hubungkan', [UserKelompokController::class, 'hubungkan']);
    Route::get('/kelompok/{kelompok}/hubungkan/user', [UserKelompokController::class, 'showAllUsers']);
    Route::delete('/user/{user}/hubungan', [UserKelompokController::class, 'hapusHubungkan']);

    Route::get("/kelompok/{kelompok}/buathasil", [HasilController::class, 'createhasil']);
    Route::get("/kelompok/{kelompok}/edit/{hasil}", [HasilController::class, 'edithasil']);
    Route::post("/kelompok/{kelompok}/hasil", [HasilController::class, 'create']);
    Route::post("/kelompok/{kelompok}/hasil/{hasil}", [HasilController::class, 'edit']);
    Route::delete("/kelompok/{kelompok}/hasil/{hasil}", [HasilController::class, 'hapus']);

    Route::get("/kelompok/{kelompok}/luas", [LuasController::class, "edit"]);
    Route::put("/kelompok/{kelompok}/luas", [LuasController::class, "update"]);
});

// Route::middleware('auth')->group(function () {
//     // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
