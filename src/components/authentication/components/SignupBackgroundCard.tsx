import { ReactNode } from 'react';

interface SignupBackgroundCardProps {
  children: ReactNode;
}

const SignupBackgroundCard = ({ children }: SignupBackgroundCardProps) => {
  return (
    <div className="mx-auto w-full max-w-[866px] overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat sm:bg-[url('/images/ns-img-375.jpg')] sm:p-[70px] md:rounded-4xl">
      {children}
    </div>
  );
};

export default SignupBackgroundCard;
