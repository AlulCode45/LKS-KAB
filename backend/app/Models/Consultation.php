<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Consultation extends Model
{
    use HasFactory;
    protected $table = 'consultation';
    protected $guarded = ['id'];
    public $timestamps = false;

    function doctor(): HasOne
    {
        return $this->hasOne(Medicals::class, 'id', 'doctor_id');
    }
}
