interface MobileTopBarTitleProps {
  title: string;
}

const MobileTopBarTitle = ({ title }: MobileTopBarTitleProps) => {
  return <p className="text-tagline-2 text-secondary dark:text-accent font-medium">{title}</p>;
};

export default MobileTopBarTitle;
