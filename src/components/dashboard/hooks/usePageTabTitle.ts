'use client';

import { useEffect } from 'react';

const APP_NAME = 'Inkai';

export const buildTabTitle = (label: string) => {
  const trimmed = label.trim();
  if (!trimmed) {
    return APP_NAME;
  }

  return `${trimmed} | ${APP_NAME}`;
};

export const usePageTabTitle = (label: string) => {
  useEffect(() => {
    document.title = buildTabTitle(label);
  }, [label]);
};
