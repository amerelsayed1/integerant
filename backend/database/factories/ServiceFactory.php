<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ServiceFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->randomElement([
            'Web Development',
            'Mobile App Development',
            'SaaS Development',
            'Technical Consulting',
            'UI/UX Design',
            'Maintenance & Support',
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
        ];
    }
}
