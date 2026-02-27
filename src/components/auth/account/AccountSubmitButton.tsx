interface AccountSubmitButtonProps {
  label: string;
  disabled: boolean;
}

const AccountSubmitButton = ({ label, disabled }: AccountSubmitButtonProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
      <button
        type="submit"
        disabled={disabled}
        className="btn-md-v2 btn-secondary-v2 h-10 rounded-[10px] px-4 text-tagline-2 font-medium disabled:cursor-not-allowed disabled:opacity-60">
        {label}
      </button>
    </div>
  );
};

export default AccountSubmitButton;
