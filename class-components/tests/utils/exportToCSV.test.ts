import { describe, test, expect, vi } from 'vitest';
import exportToCSV from '../../src/utils/exportToCSV'; // Убедитесь, что путь правильный
import { ICharacterWithId, Gender } from '../../src/interfaces/Characters'; // Замените на правильный путь

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
    const csvContent = characters
      .map(
        (item) =>
          `${item.name},${item.gender},${item.birth_year},${item.height},${item.skin_color},${item.hair_color},${item.eye_color}`,
      )
      .join('\n');

    const createBlob = vi.fn((content: string, options: { type: string }) => ({
      content,
      type: options.type,
    }));
    vi.stubGlobal('Blob', createBlob);

    const appendChild = vi.fn();
    const removeChild = vi.fn();
    const click = vi.fn();

    const link = {
      setAttribute: vi.fn(),
      click,
      download: true,
    };

    vi.stubGlobal('document', {
      createElement: () => link,
      body: {
        appendChild,
        removeChild,
      },
    });

    const mockUrl = 'http://example.com/test-url';
    const createObjectURL = vi.fn(() => mockUrl);
    vi.stubGlobal('URL', {
      createObjectURL,
    });

    exportToCSV(characters);

    expect(createBlob).toHaveBeenCalledWith([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    expect(createObjectURL).toHaveBeenCalled();
    expect(link.setAttribute).toHaveBeenCalledWith('href', mockUrl);
    expect(link.setAttribute).toHaveBeenCalledWith(
      'download',
      '2_characters.csv',
    );
    expect(click).toHaveBeenCalled();
    expect(appendChild).toHaveBeenCalledWith(link);
    expect(removeChild).toHaveBeenCalledWith(link);
  });
});
