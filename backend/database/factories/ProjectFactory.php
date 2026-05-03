<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    public function definition(): array
    {
        return [
            'code'       => strtoupper($this->faker->unique()->bothify('PRJ-####')),
            'name'       => $this->faker->sentence(3, false),
            'client_id'  => Client::factory(),
            'service_id' => Service::factory(),
            'progress'   => $this->faker->numberBetween(0, 100),
            'status'     => $this->faker->randomElement(['Planning', 'In Progress', 'Review', 'Completed']),
            'due_date'   => $this->faker->dateTimeBetween('+1 week', '+6 months')->format('Y-m-d'),
            'team'       => null,
        ];
    }

    public function active(): static
    {
        return $this->state([
            'status' => $this->faker->randomElement(['Planning', 'In Progress', 'Review']),
        ]);
    }

    public function completed(): static
    {
        return $this->state(['status' => 'Completed', 'progress' => 100]);
    }
}
