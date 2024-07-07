interface ApiCharacter {
  count: number;
  results: Character[];
}

interface Character {
  url: string;
  name: string;
  birth_year: string;
  gender: 'Male' | 'Female';
  height: number;
  hair_color: string;
  eye_color: string;
  skin_color: string;
}

export interface Item {
  id: string;
  title: string;
  description: {
    birth_year: string;
    gender: 'Male' | 'Female';
    height: number;
    hair_color: string;
    eye_color: string;
    skin_color: string;
  };
}

export const fetchStarWars = async (query: string): Promise<Item[]> => {
  const url = `https://swapi.dev/api/people/?search=${query}&page=1`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error('Failed to fetch data. Please try again later.');
  let data: ApiCharacter = await response.json();

  if (data.count === 0) {
    const url2 = `https://swapi.dev/api/people/?page=1`;
    const response2 = await fetch(url2);
    if (!response2.ok)
      throw new Error('Failed to fetch data. Please try again later.');
    data = await response2.json();
  }

  return data.results.map((el) => ({
    id: el.url,
    title: el.name,
    description: {
      birth_year: el.birth_year,
      gender: el.gender,
      height: el.height,
      hair_color: el.hair_color,
      eye_color: el.eye_color,
      skin_color: el.skin_color,
    },
  }));
};
