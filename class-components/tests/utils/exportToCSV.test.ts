import { describe, test, expect, vi } from 'vitest';
import { saveAs } from 'file-saver';

import exportToCSV from '../../src/utils/exportToCSV';
import { ICharacterWithId, Gender } from '../../src/interfaces/Characters';

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

const characters: ICharacterWithId[] = [
  {
    url: 'https',
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: Gender.MALE,
    height: 172,
    skin_color: 'fair',
    hair_color: 'blond',
    eye_color: 'blue',
    homeworld: '',
    vehicles: [],
    starships: [],
    id: 1,
  },
  {
    url: 'https',
    name: 'Leia Organa',
    birth_year: '19BBY',
    gender: Gender.FEMALE,
    height: 150,
    skin_color: 'light',
    hair_color: 'brown',
    eye_color: 'brown',
    homeworld: '',
    vehicles: [],
    starships: [],
    id: 2,
  },
];

describe('exportToCSV function', () => {
  test('creates a CSV file with correct content', () => {
    exportToCSV(characters);

    const expectedCsvContent = characters
      .map(
        (item) =>
          `${item.name},${item.gender},${item.birth_year},${item.height},${item.skin_color},${item.hair_color},${item.eye_color}`,
      )
      .join('\n');
    const expectedBlob = new Blob([expectedCsvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const expectedFilename = '2_characters.csv';

    expect(saveAs).toHaveBeenCalledWith(expectedBlob, expectedFilename);
  });
});
