interface SignupDividerProps {
  label: string;
}

const SignupDivider = ({ label }: SignupDividerProps) => {
  return (
    <div className="py-8 text-center">
      <p className="text-tagline-2 text-secondary dark:text-accent font-normal">{label}</p>
    </div>
  );
};

export default SignupDivider;
