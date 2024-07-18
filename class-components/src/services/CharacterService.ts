import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IApiCharacters,
  ICharacter,
  IStarship,
  IVehicle,
  IHomeworld,
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
    fetchHomeworld: build.query<IHomeworld, number>({
      query: (idHomeworld) => ({
        url: `/planets/${idHomeworld}`,
      }),
    }),
    fetchVehicle: build.query<IVehicle, number>({
      query: (idVehicle) => ({
        url: `/vehicles/${idVehicle}`,
      }),
    }),
    fetchStarship: build.query<IStarship, number>({
      query: (idStarship) => ({
        url: `/starships/${idStarship}`,
      }),
    }),
  }),
});

export default CharactersApi;
