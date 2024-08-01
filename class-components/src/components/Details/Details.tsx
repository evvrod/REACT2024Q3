import Close from '@components/Close/Close';
import InfoCharacter from '@components/InfoCharacter/InfoCharacter';

export default function Details({ id }: { id: number }) {
  return (
    <>
      <Close />
      <InfoCharacter id={id} />
    </>
  );
}
