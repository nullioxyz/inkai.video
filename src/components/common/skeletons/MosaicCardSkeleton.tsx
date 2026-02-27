interface MosaicCardSkeletonProps {
  mediaAspectClassName?: string;
  lines?: Array<string>;
  className?: string;
  contentClassName?: string;
}

const MosaicCardSkeleton = ({
  mediaAspectClassName = 'aspect-[3/4]',
  lines = ['h-3.5 w-2/3', 'h-3 w-1/2'],
  className = 'w-full',
  contentClassName = 'space-y-2 p-4',
}: MosaicCardSkeletonProps) => {
  return (
    <article className={`border-stroke-3 dark:border-stroke-7 animate-pulse overflow-hidden rounded-[12px] border ${className}`.trim()}>
      <div className={`${mediaAspectClassName} bg-background-3 dark:bg-background-7`} />
      <div className={contentClassName}>
        {lines.map((lineClassName, index) => (
          <div key={`${lineClassName}-${index}`} className={`${lineClassName} rounded bg-background-3 dark:bg-background-7`} />
        ))}
      </div>
    </article>
  );
};

export default MosaicCardSkeleton;
