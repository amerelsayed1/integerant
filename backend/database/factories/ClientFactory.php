<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'     => $this->faker->company(),
            'industry' => $this->faker->randomElement(['Technology', 'Finance', 'Healthcare', 'Retail', 'Education']),
            'active'   => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(['active' => false]);
    }
}
