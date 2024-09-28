<?php

namespace App\Http\Controllers;

use App\Models\opsi as ModelsOpsi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class opsi extends Controller
{
    public function index() {
        return Inertia::render("Opsi/index", [
            "opsi" => ModelsOpsi::all()
        ]);
    }

    public function store(Request $request) {

        $request->validate([
            "nama" => "required|string",
            "isi" => "required|string",
        ]);

        ModelsOpsi::create([
            "nama" => $request->nama,
            "isi" => $request->isi
        ]);

        return redirect("/opsi");
    }

    public function delete(ModelsOpsi $opsi) {
        $opsi->delete();
    }

    public function update(Request $request, ModelsOpsi $opsi) {
        $request->validate([
            "nama" => "required|string",
            "isi" => "required|string",
        ]);

        $opsi->update([
            "nama" => $request->nama,
            "isi" => $request->isi
        ]);

        return redirect("/opsi");
    }

    


}

