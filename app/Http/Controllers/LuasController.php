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

class LuasController extends Controller
{

    public function edit(KelompokTani $kelompok)
    {
        return Inertia::render("Kelompok/luas/edit", [
            "kelompok" => $kelompok->with(["ternak", "tanaman_pangan", "tanaman_hortikultura", "tanaman_perkebunan"])->get()[0]
        ]);
    }

    
    public function update(KelompokTani $kelompok, Request $request)
    {
        $kelompok->tanaman_pangan()->update([
            "padi_irigasi" =>$request->padi_irigasi,
            "padi_tadah_hujan" =>$request->padi_tadah_hujan,
            "jagung" =>$request->jagung,
        ]);

        $kelompok->tanaman_perkebunan()->update([
            "luas" => $request->luas
        ]);
        
        $kelompok->tanaman_hortikultura()->update([
            "sayuran" => $request->sayuran,
            "buah" => $request->buah,
        ]);
        
        $kelompok->ternak()->update([
            "besar" => $request->besar,
            "kecil" => $request->kecil,
            "unggas" => $request->unggas,
        ]);


           

        redirect("/kelompok");
    }

}
