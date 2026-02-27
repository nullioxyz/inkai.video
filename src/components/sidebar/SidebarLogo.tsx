import mainLogo from '@public/images/shared/main-logo.svg';
import logo from '@public/images/shared/logo.svg';
import logoDark from '@public/images/shared/logo-dark.svg';
import Image from 'next/image';

interface SidebarLogoProps {
  collapsed: boolean;
}

const SidebarLogo = ({ collapsed }: SidebarLogoProps) => {
  return (
    <div className="flex items-center overflow-hidden">
      {collapsed ? (
        <>
          <Image src={logoDark} alt="Inkai" width={28} height={28} className="block dark:hidden" />
          <Image src={logo} alt="Inkai" width={28} height={28} className="hidden dark:block" />
        </>
      ) : (
        <Image src={mainLogo} alt="Inkai" width={132} height={30} className="dark:invert" />
      )}
    </div>
  );
};

export default SidebarLogo;
