import PageSectionDescription from './components/PageSectionDescription';
import PageSectionTitle from './components/PageSectionTitle';

interface PageSectionHeaderProps {
  title: string;
  description: string;
}

const PageSectionHeader = ({ title, description }: PageSectionHeaderProps) => {
  return (
    <header className="space-y-2">
      <PageSectionTitle title={title} />
      <PageSectionDescription description={description} />
    </header>
  );
};

export default PageSectionHeader;
