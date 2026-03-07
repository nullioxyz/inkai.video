import Image from 'next/image';

const AuthLogo = () => {
  return <Image src="/images/shared/main-logo.svg" alt="Inkai" width={150} height={36} className="dark:invert" />;
};

export default AuthLogo;
