<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    public const OPEN_STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal'];

    public function definition(): array
    {
        return [
            'code'        => strtoupper($this->faker->unique()->bothify('LED-####')),
            'name'        => $this->faker->name(),
            'company'     => $this->faker->company(),
            'service_id'  => Service::factory(),
            'est_value'   => $this->faker->numberBetween(1000, 50000),
            'status'      => $this->faker->randomElement([...self::OPEN_STATUSES, 'Won', 'Lost']),
            'received_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ];
    }

    public function open(): static
    {
        return $this->state([
            'status' => $this->faker->randomElement(self::OPEN_STATUSES),
        ]);
    }

    public function won(): static
    {
        return $this->state(['status' => 'Won']);
    }

    public function lost(): static
    {
        return $this->state(['status' => 'Lost']);
    }
}
