import fetchGetDetails from '@services/ApiGetDetails';

export default async function infoCharacter({ id }: { id: number }) {
  const { data } = await fetchGetDetails(id);

  return (
    <>
      <h3>Base Info</h3>
      <ul>
        <li>height : {data?.character.height}</li>
        <li>hair color : {data?.character.hair_color}</li>
        <li>eye color : {data?.character.eye_color}</li>
        <li>skin color : {data?.character.skin_color}</li>
      </ul>
      <h3>Home world</h3>
      <ul>
        <li>{data?.homeworld.name}</li>
      </ul>
      <h3>Vehicles</h3>
      <ul>{data?.vehicles.map((el) => <li key={el.name}>{el.name}</li>)}</ul>
      <h3>Star ships</h3>
      <ul>{data?.starships.map((el) => <li key={el.name}>{el.name}</li>)}</ul>
    </>
  );
}
