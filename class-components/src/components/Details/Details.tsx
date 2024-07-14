import { Suspense } from 'react';
import {
  useNavigate,
  useLocation,
  useLoaderData,
  defer,
  Await,
  LoaderFunctionArgs,
} from 'react-router-dom';

import fetchStarWarsCharacterDetails, {
  ApiResponseCharacterDetails,
} from '../../services/apiStarWarsCharacterDetails';

import Close from '../Close/Close';
import Spinner from '../Spinner/Spinner';

interface UseLoaderData {
  data: ApiResponseCharacterDetails;
}

interface Vehicle {
  name: string;
}

interface Starship {
  name: string;
}

export default function Details() {
  const { data } = useLoaderData() as UseLoaderData;

  const navigate = useNavigate();
  const location = useLocation();

  const query = location.search.substring(1);

  const handlerClickClose = () => {
    navigate(`/?${query}`);
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={data}>
        {(resolvedData) => (
          <>
            <Close handlerClickClose={handlerClickClose} />
            <h3>Base Info</h3>
            <ul>
              <li>height : {resolvedData.character.height}</li>
              <li>hair color : {resolvedData.character.hair_color}</li>
              <li>eye color : {resolvedData.character.eye_color}</li>
              <li>skin color : {resolvedData.character.skin_color}</li>
            </ul>

            <h3>Home world</h3>
            <ul>
              <li>{resolvedData.homeworld.name}</li>
            </ul>

            <h3>Vehicles</h3>
            <ul>
              {resolvedData.vehicles.map((el: Vehicle) => (
                <li key={el.name}>{el.name}</li>
              ))}
            </ul>

            <h3>Star ships</h3>
            <ul>
              {resolvedData.starships.map((el: Starship) => (
                <li key={el.name}>{el.name}</li>
              ))}
            </ul>
          </>
        )}
      </Await>
    </Suspense>
  );
}

export async function DetailsLoader({ params }: LoaderFunctionArgs) {
  const { details } = params;

  return defer({
    data: fetchStarWarsCharacterDetails(Number(details)),
  });
}
