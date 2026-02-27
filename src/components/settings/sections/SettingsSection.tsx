import { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const SettingsSection = ({ title, children, className = '' }: SettingsSectionProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <p className="text-tagline-2 text-secondary dark:text-accent font-medium">{title}</p>
      {children}
    </div>
  );
};

export default SettingsSection;
