// import CharactersApi from '../services/CharacterService';

// function useCharacterDetails(id: number) {
//   const { data: character, isFetching: characterFetching } =
//     CharactersApi.useFetchCharacterQuery(id);

//   const { data: homeworld, isFetching: homeworldFetching } =
//     CharactersApi.useFetchHomeworldQuery(character.homeworld);

//   const vehiclesQueries =
//     character?.vehicles?.map((vehicleId: number) =>
//       CharactersApi.useFetchVehicleQuery(vehicleId),
//     ) ?? [];

//   const starshipsQueries =
//     character?.starships?.map((starshipId) =>
//       CharactersApi.useFetchStarshipQuery(starshipId),
//     ) ?? [];

//   const vehiclesFetching = vehiclesQueries.some((query) => query.isFetching);
//   const starshipsFetching = starshipsQueries.some((query) => query.isFetching);

//   const vehicles = vehiclesQueries.map((query) => query.data);
//   const starships = starshipsQueries.map((query) => query.data);

//   const isFetching =
//     characterFetching ||
//     homeworldFetching ||
//     vehiclesFetching ||
//     starshipsFetching;
//   //   const error = characterError || homeworldError;

//   return {
//     isFetching,
//     // error,
//     character,
//     homeworld,
//     vehicles,
//     starships,
//   };
// }

// export default useCharacterDetails;
