<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\KelompokTani;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class KelompokController extends Controller
{
    public function index(Request $request): Response
    {
        $limit = $request->query("limit", 10);

        $kelompok = KelompokTani::with(["hasiltani", "ternak", "tanaman_pangan", "tanaman_hortikultura", "tanaman_perkebunan"])->withCount("users");
        if ($request->has('kecamatan') && !empty($request->kecamatan)) {
            $kelompok->where('kecamatan', $request->kecamatan);
        }
        if($request->has("tipe") && !empty($request->tipe)) {
            $tipe = $request->tipe;
            if ($tipe == "pangan") {
                $kelompok->whereHas('tanaman_pangan', function ($query) {
                    $query->where("padi_irigasi", ">", 0)
                          ->orWhere("padi_tadah_hujan", ">", 0)
                          ->orWhere("jagung", ">", 0);
                });
            } else if ($tipe == "hortikultura") {
                $kelompok->whereHas('tanaman_hortikultura', function ($query) {
                    $query->where("sayuran", ">", 0)
                          ->orWhere("buah", ">", 0);
                });
            } else if ($tipe == "perkebunan") {
                $kelompok->whereHas('tanaman_perkebunan', function ($query) {
                    $query->where("luas", ">", 0);
                });
            } else if ($tipe == "ternak") {
                $kelompok->whereHas('ternak', function ($query) {
                    $query->where("unggas", ">", 0)
                          ->orWhere("besar", ">", 0)
                          ->orWhere("kecil", ">", 0);
                });
            }
        }

        $kelompok = $kelompok->paginate($limit)->appends(['limit' => $limit, "tipe" => $request->tipe,'kecamatan' => $request->kecamatan]);


        return Inertia::render("Kelompok/index", [
            "kelompok" => $kelompok,
            "kecamatan" => $request->kecamatan != null ? $request->kecamatan : "kosong",
            "tipe" => $request->tipe != null ? $request->tipe : "kosong",
        ]);
    }

    public function destroy(KelompokTani $kelompok)
    {
        $kelompok->delete();
    }

    public function create()
    {
        return Inertia::render("Kelompok/create");
    }

    public function edit(KelompokTani $kelompok)
    {
        return Inertia::render("Kelompok/edit", [
            "kelompok" => $kelompok
        ]);
    }
    public function detail(KelompokTani $kelompok)
    {
        return Inertia::render("Kelompok/detail", [
            "kelompok" => $kelompok
        ]);
    }

    public function detailuser(KelompokTani $kelompok, Request $request)
    {
        $limit = $request->query("limit", 10);

        return Inertia::render("Kelompok/user", [
            "kelompok" => $kelompok,
            "user" => $kelompok->users()->paginate($limit)->appends(['limit' => $limit])
        ]);
    }
    public function update(Request $request, KelompokTani $kelompok)
    {
        $kelompok->update([
            "nama" => $request->nama,
            "ketua" => $request->ketua,
            "bendahara" => $request->bendahara,
            "seketaris" => $request->seketaris,
            "alamat_seketariat" => $request->alamat_seketariat,
            "tahun" => $request->tahun,
            "kecamatan" => $request->kecamatan,
            "no_reg" => $request->no_reg,
            "pendamping" => $request->pendamping,
        ]);
    }

    public function store(Request $request)
    {
        $kelompok = KelompokTani::create(
            [
                "nama" => $request->nama,
                "ketua" => $request->ketua,
                "bendahara" => $request->bendahara,
                "seketaris" => $request->seketaris,
                "alamat_seketariat" => $request->alamat_seketariat,
                "tahun" => $request->tahun,
                "kecamatan" => $request->kecamatan,
                "no_reg" => $request->no_reg,
                "pendamping" => $request->pendamping,
                
            ]
        );
        $kelompok->tanaman_pangan()->create();
        $kelompok->tanaman_hortikultura()->create();
        $kelompok->tanaman_perkebunan()->create();
        $kelompok->ternak()->create();

    }
    // /**
    //  * Display the user's profile form.
    //  */
    // public function edit(Request $request): Response
    // {
    //     return Inertia::render('Profile/Edit', [
    //         'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
    //         'status' => session('status'),
    //     ]);
    // }

    // /**
    //  * Update the user's profile information.
    //  */
    // public function update(ProfileUpdateRequest $request): RedirectResponse
    // {
    //     $request->user()->fill($request->validated());

    //     if ($request->user()->isDirty('email')) {
    //         $request->user()->email_verified_at = null;
    //     }

    //     $request->user()->save();

    //     return Redirect::route('profile.edit');
    // }

    // /**
    //  * Delete the user's account.
    //  */
    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'password' => ['required', 'current_password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return Redirect::to('/');
    // }
}
