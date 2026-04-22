<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $fillable = [
        'code',
        'name',
        'client_id',
        'service_id',
        'progress',
        'status',
        'due_date',
        'team',
    ];

    protected $casts = [
        'progress' => 'integer',
        'due_date' => 'date',
        'team' => 'array',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
