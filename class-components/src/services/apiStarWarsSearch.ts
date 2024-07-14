import fetchStarWarsCharacters from './apiStarWarsCharacters';

export interface ApiCharacters {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export interface Character {
  url: string;
  name: string;
  birth_year: string;
  gender: 'Male' | 'Female';
  height: number;
  hair_color: string;
  eye_color: string;
  skin_color: string;
}

export default async function fetchStarWarsSearch(
  query: string,
  page: number = 1,
): Promise<ApiCharacters> {
  let data: ApiCharacters;

  if (query) {
    const url = `https://swapi.dev/api/people/?search=${query}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error('Failed to fetch data. Please try again later.');
    data = await response.json();
  } else {
    data = await fetchStarWarsCharacters(page);
  }

  return data;
}
