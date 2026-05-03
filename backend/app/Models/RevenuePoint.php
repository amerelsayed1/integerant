<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevenuePoint extends Model
{
    use HasFactory;

    protected $fillable = ['label', 'period_start', 'revenue', 'target'];

    protected $casts = [
        'period_start' => 'date',
        'revenue' => 'integer',
        'target' => 'integer',
    ];
}
