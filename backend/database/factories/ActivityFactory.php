<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ActivityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'actor'       => $this->faker->name(),
            'kind'        => $this->faker->randomElement(['project_created', 'lead_won', 'invoice_sent', 'client_added', 'payment_received']),
            'message'     => $this->faker->sentence(),
            'occurred_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
