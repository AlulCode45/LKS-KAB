<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Vaccinations extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public $timestamps = false;
    function spot(): HasOne
    {
        return $this->hasOne(Spots::class, 'id', 'spot_id');
    }
    function vaccine(): HasOne
    {
        return $this->hasOne(Vaccines::class, 'id', 'vaccine_id');
    }
    function vaccinator(): HasOne
    {
        return $this->hasOne(Medicals::class, 'id', 'doctor_id');
    }
}
