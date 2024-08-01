'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useClickOutside from '@hooks/useOutsideClick';

interface IDetailsWrapperProps {
  children: React.ReactNode;
}

export default function DetailsWrapper({ children }: IDetailsWrapperProps) {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const router = useRouter();
  const searchParams = useSearchParams();

  const callback = () => router.push(`/?${searchParams.toString()}`);

  useClickOutside(ref, callback);

  return <div ref={ref}>{children}</div>;
}
