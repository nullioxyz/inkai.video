interface PageSectionTitleProps {
  title: string;
}

const PageSectionTitle = ({ title }: PageSectionTitleProps) => {
  return <h1 className="text-heading-5 text-secondary dark:text-accent md:text-heading-4 font-normal">{title}</h1>;
};

export default PageSectionTitle;
