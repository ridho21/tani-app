<?php

namespace App\Http\Controllers;

use App\Models\KelompokTani;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserKelompokController extends Controller
{
    public function hubungkan(Request $request, KelompokTani $kelompok) {
        $request->validate([
            "selected" => "required|array",
            'selected.*' => 'integer'
        ]);
        $userIds = $request->input('selected');
        // dd($userIds);

    
        User::whereIn('id', $userIds)->update(['kelompok_tani_id' => $kelompok->id]);

        return redirect('/kelompok'."/".$kelompok->id."/user");
    }

    public function hapusHubungkan(User $user) {

        $user->update([
            "kelompok_tani_id" => null
        ]);


    }

    public function showAllUsers(KelompokTani $kelompok) {
        return Inertia::render("Kelompok/userconnect", [
            'users' => User::where('role','member')->where(function ($query) use ($kelompok) {
                $query->where('kelompok_tani_id', '!=', $kelompok->id)->orWhereNull('kelompok_tani_id');
            })->get(),
            'kelompok' => $kelompok,
        ]);
    }
}
