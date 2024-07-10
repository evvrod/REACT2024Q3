import { useParams } from 'react-router-dom';

export default function SearchForm() {
  const { page } = useParams();
  return (
    <>
      <div>SearchForm</div>
      <div>{page}</div>
    </>
  );
}
