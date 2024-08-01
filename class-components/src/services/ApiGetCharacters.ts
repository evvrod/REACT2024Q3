import { IApiCharacters } from '../interfaces/Characters';

const BASE_URL = `https://swapi.dev/api`;

export default async function fetchGetCharacters(
  query: string = '',
  page: number = 1,
): Promise<IApiCharacters> {
  try {
    const response = await fetch(
      `${BASE_URL}/people/?search=${query}&page=${page}`,
    );
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных');
    }
    const characters = await response.json();
    return characters;
  } catch (error) {
    return { error };
  }
}
