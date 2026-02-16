'use client';

import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react';

import Navbar from './navbar/Navbar';

const HeaderWrapper = () => {
  const { showTopNav } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Navbar showTopNav={showTopNav} />;
};

HeaderWrapper.displayName = 'HeaderWrapper';
export default HeaderWrapper;
