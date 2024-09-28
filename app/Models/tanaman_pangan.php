<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tanaman_pangan extends Model
{
    use HasFactory;

    protected $fillable = ["padi_irigasi", "padi_tadah_hujan", "jagung"];

    protected $table = "tanaman_pangan";
    // Define the relationship with the User model
    
    public function kelompokTani()
    {
        return $this->belongsTo(KelompokTani::class, "kelompok_tani_id");
    }
}
