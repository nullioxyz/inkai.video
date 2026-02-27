interface UploadTitleInputProps {
  value: string;
  placeholder: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

const UploadTitleInput = ({ value, placeholder, disabled, onChange }: UploadTitleInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="text-tagline-1 text-secondary dark:text-accent placeholder:text-secondary/50 dark:placeholder:text-accent/60 h-10 w-full min-w-0 border-0 bg-transparent pr-[56px] pl-1 outline-none"
    />
  );
};

export default UploadTitleInput;
