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
  homeworld: string;
  vehicles: string[];
  starships: string[];
}

export interface ApiResponseCharacterDetails {
  character: Character;
  homeworld: { name: string };
  vehicles: { name: string }[];
  starships: { name: string }[];
}

async function fetchStarWarsCharacterId(id: number) {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  if (!response.ok)
    throw new Error('Failed to fetch data. Please try again later.');
  const data: Character = await response.json();

  return data;
}

async function fetchHomeworld(homeworldUrl: string) {
  const response = await fetch(homeworldUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch homeworld data');
  }
  const data = await response.json();
  return data;
}

async function fetchVehicles(vehiclesUrls: string[]) {
  const responses = await Promise.all(
    vehiclesUrls.map(async (vehicleUrl) => {
      const response = await fetch(vehicleUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle data');
      }
      return response.json();
    }),
  );
  return responses;
}

async function fetchStarships(starshipsUrls: string[]) {
  const responses = await Promise.all(
    starshipsUrls.map(async (starshipUrl) => {
      const response = await fetch(starshipUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch starship data');
      }
      return response.json();
    }),
  );
  return responses;
}

export default async function fetchStarWarsCharacterDetails(
  id: number,
): Promise<ApiResponseCharacterDetails> {
  const characterData: Character = await fetchStarWarsCharacterId(id);

  const { homeworld, vehicles, starships } = characterData;

  const [homeworldData, vehiclesData, starshipsData] = await Promise.all([
    fetchHomeworld(homeworld),
    fetchVehicles(vehicles),
    fetchStarships(starships),
  ]);

  return {
    character: characterData,
    homeworld: homeworldData,
    vehicles: vehiclesData,
    starships: starshipsData,
  };
}
