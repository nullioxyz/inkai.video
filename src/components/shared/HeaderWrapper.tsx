'use client';

import { useAppContext } from '@/context/AppContext';
import { Fragment, useEffect, useState } from 'react';

import Navbar from './navbar/Navbar';
import TopNavHeading from './TopNavHeading';

const HeaderWrapper = () => {
  const { showTopNav } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Fragment>
      <TopNavHeading />
      <Navbar showTopNav={showTopNav} />
    </Fragment>
  );
};

HeaderWrapper.displayName = 'HeaderWrapper';
export default HeaderWrapper;
