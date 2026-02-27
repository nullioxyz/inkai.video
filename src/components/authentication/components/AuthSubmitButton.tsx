interface AuthSubmitButtonProps {
  label: string;
  disabled: boolean;
}

const AuthSubmitButton = ({ label, disabled }: AuthSubmitButtonProps) => {
  return (
    <div className="mt-8">
      <button type="submit" disabled={disabled} className="btn btn-md btn-primary w-full first-letter:uppercase before:content-none disabled:opacity-50">
        {label}
      </button>
    </div>
  );
};

export default AuthSubmitButton;
