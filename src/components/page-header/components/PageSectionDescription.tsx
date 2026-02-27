interface PageSectionDescriptionProps {
  description: string;
}

const PageSectionDescription = ({ description }: PageSectionDescriptionProps) => {
  return <p className="text-tagline-2 text-secondary/60 dark:text-accent/60">{description}</p>;
};

export default PageSectionDescription;
