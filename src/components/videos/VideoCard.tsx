import { HTMLAttributes, ReactNode } from 'react';

interface VideoCardRootProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

interface VideoCardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Root = ({ children, className = '', ...props }: VideoCardRootProps) => (
  <article
    className={`border-stroke-3 dark:border-stroke-7 bg-background-1 dark:bg-background-6 overflow-hidden rounded-[12px] border ${className}`.trim()}
    {...props}>
    {children}
  </article>
);

const Media = ({ children, className = '', ...props }: VideoCardSectionProps) => (
  <div className={`relative overflow-hidden ${className}`.trim()} {...props}>
    {children}
  </div>
);

const Content = ({ children, className = '', ...props }: VideoCardSectionProps) => (
  <div className={`space-y-2 p-4 ${className}`.trim()} {...props}>
    {children}
  </div>
);

const Title = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`text-tagline-1 text-secondary dark:text-accent truncate font-medium ${className}`.trim()}>{children}</p>
);

const Meta = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`text-tagline-3 text-secondary/60 dark:text-accent/60 ${className}`.trim()}>{children}</div>
);

const VideoCard = { Root, Media, Content, Title, Meta };

export default VideoCard;
