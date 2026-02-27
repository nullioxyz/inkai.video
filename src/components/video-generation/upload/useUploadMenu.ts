'use client';

import { useEffect, useRef, useState } from 'react';

export const useUploadMenu = (disabled: boolean) => {
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const uploadMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!uploadMenuRef.current) {
        return;
      }

      if (!uploadMenuRef.current.contains(event.target as Node)) {
        setShowUploadOptions(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  useEffect(() => {
    if (disabled && showUploadOptions) {
      setShowUploadOptions(false);
    }
  }, [disabled, showUploadOptions]);

  return {
    showUploadOptions,
    uploadMenuRef,
    closeMenu: () => setShowUploadOptions(false),
    toggleMenu: () => setShowUploadOptions((prev) => !prev),
  };
};
