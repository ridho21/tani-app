<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HasilTani extends Model
{
    use HasFactory;

    // Add any necessary fields to allow mass assignment
    protected $fillable = ['nama', 'jumlah', 'image','kelompok_id'];

    protected $table = 'hasil_tani';

    // Define the relationship with the User model
    public function kelompok()
    {
        return $this->belongsTo(KelompokTani::class, "kelompok_id");
    }
}