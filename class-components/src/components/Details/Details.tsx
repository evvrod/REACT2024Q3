import { useNavigate, useLocation, useParams } from 'react-router-dom';

import Close from '../Close/Close';
import Spinner from '../Spinner/Spinner';

import CharactersApi from '../../services/CharacterService';

export default function Details() {
  const { details } = useParams();
  const { data, isFetching } = CharactersApi.useFetchCharactersDetailsQuery(
    Number(details),
  );

  const navigate = useNavigate();
  const location = useLocation();

  const query = location.search.substring(1);

  const handlerClickClose = () => {
    navigate(`/?${query}`);
  };

  if (isFetching) return <Spinner />;

  return (
    <>
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
    </>
  );
}
