import { forwardRef } from 'react';
import LinkButton from '../ui/button/Button';

interface GlossaryCardProps {
  title: string;
  description: string;
  dataId: string;
  link: string;
}

const GlossaryCard = forwardRef<HTMLDivElement, GlossaryCardProps>(({ title, description, dataId, link }, ref) => {
  return (
    <div
      id={dataId.toLowerCase()}
      data-id={dataId}
      ref={ref}
      className="glossary-card dark:bg-background-8 flex flex-col justify-between gap-y-9 rounded-[20px] bg-white p-8">
      <div className="space-y-6">
        <h3 className="text-heading-5 font-normal">{title}</h3>
        <p className="text-tagline-1 text-secondary/80 dark:text-accent/80 line-clamp-4">{description}</p>
      </div>
      <div>
        <LinkButton
          href={`/glossary/${link}`}
          btnClass="btn-md-v2 btn-v2-white group-hover/btn-v2:btn-secondary-v2 "
          className="mx-auto inline-block w-[90%] md:mx-0 md:w-auto">
          Learn more
        </LinkButton>
      </div>
    </div>
  );
});

GlossaryCard.displayName = 'GlossaryCard';
export default GlossaryCard;
