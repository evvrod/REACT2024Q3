import React from 'react';

import { expect, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gender } from '../../src/interfaces/Characters';
import InfoCharacter from '../../src/components/InfoCharacter/InfoCharacter';

const mockCharacterDetailsFetchData = {
  character: {
    url: 'https://swapi.dev/api/people/1/',
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: Gender.MALE,
    height: 172,
    hair_color: 'Blond',
    eye_color: 'Blue',
    skin_color: 'Fair',
    homeworld: 'https://swapi.dev/api/planets/1/',
    vehicles: [
      'https://swapi.dev/api/vehicles/14/',
      'https://swapi.dev/api/vehicles/30/',
    ],
    starships: [
      'https://swapi.dev/api/starships/12/',
      'https://swapi.dev/api/starships/22/',
    ],
  },
  homeworld: {
    url: 'https://swapi.dev/api/planets/1/',
    name: 'Tatooine',
  },
  vehicles: [
    { url: 'https://swapi.dev/api/vehicles/14/', name: 'Speeder' },
    { url: 'https://swapi.dev/api/vehicles/30/', name: 'Landspeeder' },
  ],
  starships: [
    { url: 'https://swapi.dev/api/starships/12/', name: 'X-Wing' },
    { url: 'https://swapi.dev/api/starships/22/', name: 'TIE Fighter' },
  ],
};
describe('Testing InfoCharacter', () => {
  test('renders info correctly', () => {
    render(<InfoCharacter data={mockCharacterDetailsFetchData} />);

    expect(screen.getByText('Base Info')).toBeInTheDocument();
    expect(screen.getByText('height : 172')).toBeInTheDocument();
    expect(screen.getByText('hair color : Blond')).toBeInTheDocument();
    expect(screen.getByText('eye color : Blue')).toBeInTheDocument();
    expect(screen.getByText('skin color : Fair')).toBeInTheDocument();

    expect(screen.getByText('Home world')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();

    expect(screen.getByText('Vehicles')).toBeInTheDocument();
    expect(screen.getByText('Speeder')).toBeInTheDocument();
    expect(screen.getByText('Landspeeder')).toBeInTheDocument();

    expect(screen.getByText('Star ships')).toBeInTheDocument();
    expect(screen.getByText('X-Wing')).toBeInTheDocument();
    expect(screen.getByText('TIE Fighter')).toBeInTheDocument();
  });
});
