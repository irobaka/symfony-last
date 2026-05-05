<?php

namespace App\Story;

use App\Factory\PlanetFactory;
use App\Factory\VoyageFactory;
use Zenstruck\Foundry\Attribute\AsFixture;
use Zenstruck\Foundry\Story;

#[AsFixture(name: 'main')]
final class AppStory extends Story
{
    public function build(): void
    {
        PlanetFactory::createMany(5);
        PlanetFactory::createMany(2, function() {
            $names = PlanetFactory::OTHER_PLANET_NAMES;

            return [
                'isInMilkyWay' => false,
                'name' => $names[array_rand($names)]
            ];
        });

        VoyageFactory::createMany(30, function () {
            return [
                'planet' => PlanetFactory::random(),
            ];
        });
    }
}
