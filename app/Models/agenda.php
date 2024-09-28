<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class agenda extends Model
{
    use HasFactory;

    protected $table = "agenda";

    protected $fillable = ['nama', 'detail_agenda','tanggal', 'kelompok_id'];

    public function kelompok() {
        return $this->belongsTo('kelompok_tani', 'kelompok_id');
    }
    
}
