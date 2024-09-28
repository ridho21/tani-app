<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ternak extends Model
{
    use HasFactory;

    protected $fillable = ["unggas", "kecil", "besar"];

    protected $table = "ternak";
    // Define the relationship with the User model
    
    public function kelompokTani()
    {
        return $this->belongsTo(KelompokTani::class, "kelompok_tani_id");
    }
}
