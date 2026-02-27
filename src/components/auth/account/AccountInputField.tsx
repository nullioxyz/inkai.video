interface AccountInputFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
}

const AccountInputField = ({ id, label, type, value, onChange }: AccountInputFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-tagline-2 text-secondary dark:text-accent block font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent h-11 w-full rounded-[10px] border px-4 outline-none transition focus:border-primary-400"
      />
    </div>
  );
};

export default AccountInputField;
