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

export default async function fetchStarWarsCharacters(
  page: number = 1,
): Promise<ApiCharacters> {
  const url = `https://swapi.dev/api/people/?page=${page}`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error('Failed to fetch data. Please try again later.');
  const data: ApiCharacters = await response.json();

  return data;
}
