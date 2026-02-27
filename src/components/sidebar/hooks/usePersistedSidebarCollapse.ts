'use client';

import { useState } from 'react';

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'inkai-dashboard-sidebar-collapsed';

export const usePersistedSidebarCollapse = () => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const toggle = () => {
    setCollapsed((previous) => {
      const next = !previous;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(next));
      } catch {
        // Ignore storage access issues.
      }
      return next;
    });
  };

  return { collapsed, toggle };
};
