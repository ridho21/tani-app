<?php

namespace App\Http\Controllers;

use App\Models\HasilTani;
use App\Models\KelompokTani;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HasilController extends Controller
{
    public function show(Request $request, KelompokTani $kelompok) {
        $limit = $request->query("limit", 10);

        return Inertia::render("Hasil/index", [
            "hasil" => $kelompok->hasiltani()->paginate($limit)->appends(['limit' => $limit]),
            "kelompok" => $kelompok
        ]);
    }

    public function createhasil(KelompokTani $kelompok) {
        return Inertia::render("Hasil/create", [
            "kelompok" => $kelompok
        ]);
    }
    
    public function editHasil(KelompokTani $kelompok, HasilTani $hasil) {
        
        return Inertia::render("Hasil/edit", [
            "kelompok" => $kelompok,
            "hasil" => $hasil
        ]);
    }



    public function create(Request $request, KelompokTani $kelompok) {
        $request->validate([
            "nama" => 'required|string|max:255',
            "jumlah" => 'required|integer|min:1',
            'gambar' => "required|image|mimes:jpeg,png,jpg,gif|max:2048"
        ]);

        $image = $request->file('gambar');
        $path = $image->store('images', 'public');

        HasilTani::create([
            "nama" => $request->nama,
            "jumlah" => $request->jumlah,
            "kelompok_id" => $kelompok->id,
            "image" => $path,
        ]);

        return redirect("/kelompok"."/".$kelompok->id);
    }

    public function edit( Request $request,KelompokTani $kelompok, HasilTani $hasil) {
        $request->validate([
            "nama" => 'required|string|max:255',
            "jumlah" => 'required|integer|min:1',
            'gambar' => "image|mimes:jpeg,png,jpg,gif|max:2048"
        ]);

        

        $hasil->nama = $request->nama;
        $hasil->jumlah = $request->jumlah;

        if($request->hasFile("gambar")) {

            $image = $request->file('gambar');
            $path = $image->store('images', 'public');

            $hasil->image = $path;
        }

        $hasil->save();
        

        
        
        return redirect("/kelompok"."/".$kelompok->id);
    }

    public function hapus( KelompokTani $kelompok, HasilTani $hasil) {
        $hasil->delete();
    }



}
