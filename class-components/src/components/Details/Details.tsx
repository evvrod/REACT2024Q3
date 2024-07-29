import React from 'react';

import Close from '../Close/Close';
import InfoCharacter from '../InfoCharacter/InfoCharacter';
import { ICharacterDetails } from '../../interfaces/Characters';

export default function Details({
  data,
}: {
  data: ICharacterDetails;
}): React.ReactNode {
  return (
    <>
      <Close />
      <InfoCharacter data={data} />
    </>
  );
}
