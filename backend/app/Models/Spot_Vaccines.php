<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spot_Vaccines extends Model
{
    use HasFactory;
    protected $table = 'spot_vaccines';
    protected $guarded = ['id'];
    public $timestamps = false;
}
