<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RevenuePoint extends Model
{
    protected $fillable = ['label', 'period_start', 'revenue', 'target'];

    protected $casts = [
        'period_start' => 'date',
        'revenue' => 'integer',
        'target' => 'integer',
    ];
}
