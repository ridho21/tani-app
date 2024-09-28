<?php

namespace App\Http\Controllers;

use App\Models\Beritas;
use App\Models\KelompokTani;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeritaController extends Controller
{
   
    public function index(Request $request) {

        $limit = $request->query("limit", 10);

        return Inertia::render("Berita/index", [
            "berita" => Beritas::paginate($limit)->appends(['limit' => $limit])
        ]);
    }

    public function create() {
        return Inertia::render("Berita/create");
    }

    public function edit(Beritas $berita) {
        return Inertia::render("Berita/edit", [
            "berita" => $berita
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            "judul" => 'required|string|max:255',
            "isi" => "required|string",
            'gambar' => "required|image|mimes:jpeg,png,jpg,gif|max:2048"
        ]);

        $image = $request->file('gambar');
        $path = $image->store('images/berita', 'public');

        Beritas::create([
            "judul" => $request->judul,
            "isi" => $request->isi,
            "image" => $path
        ]);

        return redirect("/berita");
    
    }


    public function update(Request $request, Beritas $berita) {
        $request->validate([
            "judul" => 'required|string|max:255',
            "isi" => "required|string",
            'gambar' => "image|mimes:jpeg,png,jpg,gif|max:2048"
        ]);
        $berita->judul = $request->judul;
        $berita->isi = $request->isi;

        if($request->hasFile("gambar")) {

            $image = $request->file('gambar');
            $path = $image->store('images/berita', 'public');

            $berita->image = $path;
        }

        $berita->save();
        // $berita->update([
        //     "judul" => $request->judul,
        //     "isi" => $request->isi,
        //     "image" => 
        // ]);

        return redirect("/berita");
    }

    public function destroy(KelompokTani $kelompok, Beritas $berita) {
        $berita->delete();
    }


}
