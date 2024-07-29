import React from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import LayoutRoot from '@components/LayoutRoot/LayoutRoot';
import LayoutSearch from '@components/LayoutSearch/LayoutSearch';

import Details from '@components/Details/Details';
import DetailsWrapper from '@components/DetailsWrapper/DetailsWrapper';

import { IApiCharacters, ICharacterDetails } from 'interfaces/Characters';
import fetchGetDetails from '@services/ApiGetDetails';
import fetchGetCharacters from '@services/ApiGetCharacters';

export default function PageDetails(
  pageProps: InferGetServerSidePropsType<typeof getServerSideProps>,
): React.ReactNode {
  const { characterDetails } = pageProps;
  return (
    <DetailsWrapper>
      <Details data={characterDetails} />
    </DetailsWrapper>
  );
}

PageDetails.getLayout = (
  page: React.ReactNode,
  pageProps: InferGetServerSidePropsType<typeof getServerSideProps>,
) => (
  <LayoutRoot>
    <LayoutSearch data={pageProps.characters}> {page}</LayoutSearch>
  </LayoutRoot>
);

export const getServerSideProps = (async (context) => {
  const id = Number(context.params?.details);
  const characterDetails = await fetchGetDetails(id);

  const { query, page } = context.query;
  const characters = await fetchGetCharacters(
    query !== 'all' ? (query as string) : '',
    Number(page),
  );

  return { props: { characterDetails, characters } };
}) satisfies GetServerSideProps<{
  characterDetails: ICharacterDetails;
  characters: IApiCharacters;
}>;
