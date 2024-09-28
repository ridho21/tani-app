<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelompokTani extends Model
{
    use HasFactory;

    // Add any necessary fields to allow mass assignment
    protected $fillable = ['nama', 'ketua', 'bendahara', 'seketaris', 'alamat_seketariat', 'tahun', 'kecamatan', 'no_reg', 'pendamping'];

    protected $table = "kelompok_tani";
    // Define the relationship with the User model
    public function users()
    {
        return $this->hasMany(User::class, 'kelompok_tani_id');
    }

    public function hasiltani() {
        return $this->hasMany(HasilTani::class, "kelompok_id");
    }

    public function agenda() {
        return $this->hasMany(agenda::class, 'kelompok_id');
    }

    public function tanaman_pangan() {
        return $this->hasOne(tanaman_pangan::class, "kelompok_id");
    }
    public function tanaman_hortikultura() {
        return $this->hasOne(tanaman_hortikultura::class, "kelompok_id");
    }
    public function tanaman_perkebunan() {
        return $this->hasOne(tanaman_perkebunan::class, "kelompok_id");
    }
    public function ternak() {
        return $this->hasOne(ternak::class, "kelompok_id");
    }
}