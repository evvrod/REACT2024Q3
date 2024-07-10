import { useParams } from 'react-router-dom';

export default function Details() {
  const { details } = useParams();
  return (
    <>
      <div>Details</div>
      <div>{details}</div>
    </>
  );
}
