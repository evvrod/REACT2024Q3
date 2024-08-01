import React from 'react';

import Close from '../Close/Close';
import InfoCharacter from '../InfoCharacter/InfoCharacter';

export default function Details({ id }: { id: number }): React.ReactNode {
  return (
    <>
      <Close />
      <InfoCharacter id={id} />
    </>
  );
}
