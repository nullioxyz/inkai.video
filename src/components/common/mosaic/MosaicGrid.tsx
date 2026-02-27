import { ReactNode } from 'react';

interface MosaicGridProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T) => ReactNode;
  className?: string;
  itemClassName?: string;
}

const defaultGridClassName = 'columns-1 gap-1.5 sm:columns-3 xl:columns-5';
const defaultItemClassName = 'mb-1.5 break-inside-avoid sm:mb-2';

const MosaicGrid = <T,>({
  items,
  getKey,
  renderItem,
  className = defaultGridClassName,
  itemClassName = defaultItemClassName,
}: MosaicGridProps<T>) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={getKey(item, index)} className={itemClassName}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default MosaicGrid;
