import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  IApiCharacters,
  ICharacter,
  IStarship,
  IVehicle,
  IHomeworld,
  ICharacterDetails,
} from '../interfaces/Characters';

type QueryArg = {
  page?: number;
  query?: string;
};

const CharactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://swapi.dev/api`,
  }),
  endpoints: (build) => ({
    fetchCharacters: build.query<IApiCharacters, QueryArg>({
      query: (arg) => ({
        url: '/people',
        params: {
          page: arg.page || 1,
          search: arg.query || '',
        },
      }),
    }),
    fetchCharacter: build.query<ICharacter, number>({
      query: (idCharacter) => ({
        url: `/people/${idCharacter}`,
      }),
    }),
    fetchCharactersDetails: build.query<ICharacterDetails, number>({
      queryFn: async (idCharacter, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const characterResponse = await fetchWithBQ(`/people/${idCharacter}`);
          const character = characterResponse.data as ICharacter;

          const [homeworldResult, vehiclesResults, starshipsResults] =
            await Promise.all([
              fetchWithBQ(character.homeworld),
              Promise.allSettled(
                character.vehicles.map((vehicleUrl) => fetchWithBQ(vehicleUrl)),
              ),
              Promise.allSettled(
                character.starships.map((starshipUrl) =>
                  fetchWithBQ(starshipUrl),
                ),
              ),
            ]);

          const homeworld = homeworldResult.data as IHomeworld;

          const vehicles = vehiclesResults
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value.data as IVehicle);

          const starships = starshipsResults
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value.data as IStarship);

          const details: ICharacterDetails = {
            character,
            homeworld,
            vehicles,
            starships,
          };

          return { data: details };
        } catch (error) {
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
  }),
});

export default CharactersApi;
