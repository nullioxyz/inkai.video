import { ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

const AuthCard = ({ children, className = '' }: AuthCardProps) => {
  return <div className={`bg-background-6 border-stroke-7 mx-auto w-full min-w-[400px] max-w-[400px] rounded-[20px] border px-10 py-14 ${className}`}>{children}</div>;
};

export default AuthCard;
