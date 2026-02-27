interface AuthFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  required?: boolean;
  minLength?: number;
  onChange: (value: string) => void;
}

const AuthField = ({ id, label, type, placeholder, value, required = true, minLength, onChange }: AuthFieldProps) => {
  return (
    <fieldset className="mb-4 space-y-2">
      <label htmlFor={id} className="text-tagline-2 text-accent block font-medium select-none">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="auth-form-input"
        placeholder={placeholder}
        minLength={minLength}
        required={required}
      />
    </fieldset>
  );
};

export default AuthField;
