import Image from 'next/image';
import mainLogo from '@public/images/shared/main-logo.svg';

const AuthLogo = () => {
  return <Image src={mainLogo} alt="Inkai" width={150} height={36} className="dark:invert" />;
};

export default AuthLogo;
