<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class opsi extends Model
{
    use HasFactory;

    protected $table = "opsi";

    protected $fillable = ['nama', 'isi'];
}