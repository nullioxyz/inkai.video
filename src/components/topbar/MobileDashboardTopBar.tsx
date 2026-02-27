import MobileTopBarMenuButton from './components/MobileTopBarMenuButton';
import MobileTopBarSpacer from './components/MobileTopBarSpacer';
import MobileTopBarTitle from './components/MobileTopBarTitle';

interface MobileDashboardTopBarProps {
  title?: string;
  onOpenMenu: () => void;
}

const MobileDashboardTopBar = ({ title = 'Inkai', onOpenMenu }: MobileDashboardTopBarProps) => {
  return (
    <div className="bg-background-3/90 dark:bg-background-7/90 border-stroke-3 dark:border-stroke-7 sticky top-0 z-30 flex items-center justify-between border-b px-3 py-3 backdrop-blur-sm md:hidden">
      <MobileTopBarMenuButton onOpenMenu={onOpenMenu} />
      <MobileTopBarTitle title={title} />
      <MobileTopBarSpacer />
    </div>
  );
};

export default MobileDashboardTopBar;
