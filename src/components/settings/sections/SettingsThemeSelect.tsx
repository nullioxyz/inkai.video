type ThemeOption = 'system' | 'light' | 'dark';

interface SettingsThemeSelectProps {
  value: ThemeOption;
  onChange: (theme: ThemeOption) => void;
  labels: {
    system: string;
    light: string;
    dark: string;
    fieldLabel: string;
  };
}

const SettingsThemeSelect = ({ value, onChange, labels }: SettingsThemeSelectProps) => {
  return (
    <>
      <label htmlFor="settings-theme" className="text-tagline-2 text-secondary dark:text-accent font-medium">
        {labels.fieldLabel}
      </label>
      <select
        id="settings-theme"
        value={value}
        onChange={(event) => onChange(event.target.value as ThemeOption)}
        className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent h-11 w-full rounded-[10px] border px-4 outline-none transition focus:border-primary-400">
        <option value="system">{labels.system}</option>
        <option value="light">{labels.light}</option>
        <option value="dark">{labels.dark}</option>
      </select>
    </>
  );
};

export default SettingsThemeSelect;
export type { ThemeOption };
