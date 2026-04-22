<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = ['actor', 'kind', 'message', 'occurred_at'];

    protected $casts = [
        'occurred_at' => 'datetime',
    ];
}
