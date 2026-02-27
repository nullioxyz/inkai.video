import { ReactNode } from 'react';

interface SignupInnerCardProps {
  children: ReactNode;
}

const SignupInnerCard = ({ children }: SignupInnerCardProps) => {
  return <div className="bg-background-1 dark:bg-background-6 max-w-[400px] rounded-[20px] px-8 py-14">{children}</div>;
};

export default SignupInnerCard;
