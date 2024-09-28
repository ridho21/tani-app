<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tanaman_perkebunan extends Model
{
    use HasFactory;

    protected $fillable = ["luas"];

    protected $table = "tanaman_perkebunan";
    // Define the relationship with the User model
    
    public function kelompokTani()
    {
        return $this->belongsTo(KelompokTani::class, "kelompok_tani_id");
    }
}
