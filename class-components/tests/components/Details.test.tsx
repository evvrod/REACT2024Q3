import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Details from '../../src/components/Details/Details';

import { ICharacterDetails, Gender } from '../../src/interfaces/Characters';

vi.mock('../../src/components/Close/Close', () => ({
  __esModule: true,
  default: () => <div>Close</div>,
}));

vi.mock('../../src/components/InfoCharacter/InfoCharacter', () => ({
  __esModule: true,
  default: ({ data }: { data: ICharacterDetails }) => (
    <div>
      <h2>{data.character.name}</h2>
      <p>Birth Year: {data.character.birth_year}</p>
      <p>Gender: {data.character.gender}</p>
    </div>
  ),
}));

describe('Details Component', () => {
  const mockData = {
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

  it('should render Close and InfoCharacter components correctly', () => {
    render(<Details data={mockData} />);

    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
  });
});
