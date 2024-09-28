<?php

namespace App\Http\Controllers;

use App\Models\HasilTani;
use App\Models\KelompokTani;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class dashboardcontroller extends Controller
{
    public function index(User $user)
    {
        if ($user->role == "member") {
            return Inertia::render("Dashboard", [
                "user" => $user,
                "kelompok" => $user->kelompokTani(),
                "hasil" => HasilTani::where("kelompok_id", $user->kelompokTani->id)->get()
            ]);
        } else {
            $kecamatanCounts = KelompokTani::select('kecamatan', DB::raw('count(*) as total'))
                ->groupBy('kecamatan')
                ->get();
            return Inertia::render("Dashboard", [
                "user" => User::where("role", "member")->get(),
                "kelompok" => KelompokTani::all(),
                "hasil" => HasilTani::with("kelompok")->get(),
                "kelompokKecamatan" => $kecamatanCounts
            ]);
        }
    }
}
