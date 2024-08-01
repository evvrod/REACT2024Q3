import { ICharacterDetails } from '../interfaces/Characters';

const BASE_URL = `https://swapi.dev/api`;

export default async function fetchGetDetails(id: number) {
  try {
    const characterResponse = await fetch(`${BASE_URL}/people/${id}`);
    const character = await characterResponse.json();

    const [homeworldResult, vehiclesResults, starshipsResults] =
      await Promise.all([
        fetch(character.homeworld),
        Promise.allSettled(
          character.vehicles.map((vehicleUrl: string) => fetch(vehicleUrl)),
        ),
        Promise.allSettled(
          character.starships.map((starshipUrl: string) => fetch(starshipUrl)),
        ),
      ]);

    const homeworld = await homeworldResult.json();

    const vehicles = await Promise.all(
      vehiclesResults
        .filter((result) => result.status === 'fulfilled')
        .map((result) =>
          (result as PromiseFulfilledResult<Response>).value.json(),
        ),
    );

    const starships = await Promise.all(
      starshipsResults
        .filter((result) => result.status === 'fulfilled')
        .map((result) =>
          (result as PromiseFulfilledResult<Response>).value.json(),
        ),
    );

    const details: ICharacterDetails = {
      character,
      homeworld,
      vehicles,
      starships,
    };

    return { data: details };
  } catch (error) {
    return { error };
  }
}
