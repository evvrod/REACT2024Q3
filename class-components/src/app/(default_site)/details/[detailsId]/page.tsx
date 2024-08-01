import Details from '@components/Details/Details';
import DetailsWrapper from '@components/DetailsWrapper/DetailsWrapper';

interface IPageProps {
  params: { detailsId: number };
}

export default async function Page({ params }: IPageProps) {
  const id = params.detailsId;

  return (
    <DetailsWrapper>
      <Details id={id} />
    </DetailsWrapper>
  );
}
