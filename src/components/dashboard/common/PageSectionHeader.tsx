interface PageSectionHeaderProps {
  title: string;
  description: string;
}

const PageSectionHeader = ({ title, description }: PageSectionHeaderProps) => {
  return (
    <header className="space-y-2">
      <h1 className="text-heading-5 text-secondary dark:text-accent md:text-heading-4 font-normal">{title}</h1>
      <p className="text-tagline-2 text-secondary/60 dark:text-accent/60">{description}</p>
    </header>
  );
};

export default PageSectionHeader;
