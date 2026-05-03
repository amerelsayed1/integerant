<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RevenuePointFactory extends Factory
{
    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-12 months', 'now');

        return [
            'label'        => $date->format('M Y'),
            'period_start' => $date->format('Y-m-01'),
            'revenue'      => $this->faker->numberBetween(5000, 50000),
            'target'       => $this->faker->numberBetween(10000, 60000),
        ];
    }
}
