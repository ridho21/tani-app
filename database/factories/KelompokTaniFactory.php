<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KelompokTani>
 */
class KelompokTaniFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => fake()->word(),
            'seketaris' => fake()->name(),
            'ketua' => fake()->name(),
            'bendahara' => fake()->name(),
            'alamat_seketariat' => fake()->address(),
            'tahun' => fake()->year,
        ];
    }
}
