<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Societies extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public $timestamps = false;

    function regional(): HasOne
    {
        return $this->hasOne(Regionals::class, 'id', 'regional_id');
    }
}