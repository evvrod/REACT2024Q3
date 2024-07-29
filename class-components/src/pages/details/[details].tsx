import { useRouter } from 'next/router';

import Close from '../../components/Close/Close';
import Spinner from '../../components/Spinner/Spinner';
import LayoutHome from '../../components/LayoutHome/LayoutHome';

import CharactersApi from '../../services/CharacterService';

export default function Details() {
  const router = useRouter();
  const { query, page, details } = router.query;
  
  const { data, isFetching } = CharactersApi.useFetchCharactersDetailsQuery(
    Number(details),
  );

  const handlerClickClose = () => {
    router.push({
      pathname: '/',
      query: { query, page },
    });
  };

  if (isFetching)
    return (
      <LayoutHome>
        <Spinner />
      </LayoutHome>
    );

  return (
    <LayoutHome>
      <Close handlerClickClose={handlerClickClose} />
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
    </LayoutHome>
  );
}
