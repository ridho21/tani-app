<?php

namespace App\Http\Controllers;

use App\Models\agenda;
use App\Models\KelompokTani;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AgendaController extends Controller
{
    //

    public function index(KelompokTani $kelompok, Request $request) {

        $limit = $request->query("limit", 10);


        return Inertia::render('Agenda/index', [
            "agenda" => $kelompok->agenda()->paginate($limit)->appends(['limit' => $limit]),
            "kelompok" => $kelompok
        ]);
    }

    public function create(KelompokTani $kelompok) {
        return Inertia::render("Agenda/create", [
            "kelompok" => $kelompok
        ]);
    }

    public function edit(KelompokTani $kelompok, agenda $agenda) {
        return Inertia::render("Agenda/edit", [
            "agenda" => $agenda,
            "kelompok" => $kelompok
        ]);
    }

    public function store(Request $request, KelompokTani $kelompok) {

        $request->validate([
            'nama' => 'required|string|max:255',
            'detail_agenda' => 'required|string',
            'tanggal' => 'required|date'
        ]);

        agenda::create([
            "kelompok_id" => $kelompok->id,
            'nama' => $request->nama,
            'detail_agenda' => $request->detail_agenda,
            'tanggal' => $request->tanggal,
        ]);

        return redirect('/kelompok'.'/'.$kelompok->id.'/agenda');
    }

    public function update(Request $request, KelompokTani $kelompok,agenda $agenda) {
        $request->validate([
            'nama' => 'required|string|max:255',
            'detail_agenda' => 'required|string',
            'tanggal' => 'required|date'
        ]);


        $agenda->update([
            "kelompok_id" => $kelompok->id,
            'nama' => $request->nama,
            'detail_agenda' => $request->detail_agenda,
            'tanggal' => $request->tanggal,
        ]);

        return redirect('/kelompok'.'/'.$kelompok->id.'/agenda');
    }

    public function destroy(KelompokTani $kelompok, agenda $agenda) {
        $agenda->delete();
    }


}
