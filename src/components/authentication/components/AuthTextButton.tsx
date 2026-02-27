interface AuthTextButtonProps {
  label: string;
  onClick: () => void;
}

const AuthTextButton = ({ label, onClick }: AuthTextButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-stroke-7 text-tagline-2 text-accent/85 hover:bg-background-7 hover:text-accent inline-flex items-center gap-2 rounded-full border px-5 py-2.5 transition">
      {label}
    </button>
  );
};

export default AuthTextButton;
