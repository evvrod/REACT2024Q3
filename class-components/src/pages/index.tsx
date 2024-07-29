import React from 'react';

import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';

import LayoutRoot from '@components/LayoutRoot/LayoutRoot';
import LayoutSearch from '@components/LayoutSearch/LayoutSearch';

import fetchGetCharacters from '@services/ApiGetCharacters';
import { IApiCharacters } from '@interfaces/Characters';

export default function PageHome(): React.ReactNode {
  return null;
}

PageHome.getLayout = (
  page: React.ReactNode,
  pageProps: InferGetServerSidePropsType<typeof getServerSideProps>,
) => (
  <LayoutRoot>
    <LayoutSearch data={pageProps.characters}> {page}</LayoutSearch>
  </LayoutRoot>
);

export const getServerSideProps = (async (
  context: GetServerSidePropsContext,
) => {
  const { query, page } = context.query;

  const characters = await fetchGetCharacters(
    query !== 'all' ? (query as string) || '' : '',
    Number(page) || 1,
  );

  return { props: { characters } };
}) satisfies GetServerSideProps<{ characters: IApiCharacters }>;
