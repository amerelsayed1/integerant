<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('revenue_points', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->date('period_start');
            $table->unsignedBigInteger('revenue');
            $table->unsignedBigInteger('target');
            $table->timestamps();

            $table->unique('period_start');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('revenue_points');
    }
};
