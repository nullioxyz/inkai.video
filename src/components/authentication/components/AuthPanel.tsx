import { ReactElement, Ref } from 'react';
import RevealAnimation from '@/components/animation/RevealAnimation';

interface AuthPanelProps {
  children: ReactElement<{
    className?: string;
    ref?: Ref<HTMLElement>;
    'data-ns-animate'?: boolean;
  }>;
}

const AuthPanel = ({ children }: AuthPanelProps) => {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="main-container">
        <RevealAnimation delay={0.1}>{children as never}</RevealAnimation>
      </div>
    </section>
  );
};

export default AuthPanel;
