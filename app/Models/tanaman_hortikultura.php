<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tanaman_hortikultura extends Model
{
    use HasFactory;

    protected $fillable = ["sayuran", "buah"];

    protected $table = "tanaman_hortikultura";
    // Define the relationship with the User model
    
    public function kelompokTani()
    {
        return $this->belongsTo(KelompokTani::class, "kelompok_tani_id");
    }
}
