interface AccountFeedbackProps {
  mustResetHint?: string | null;
  error?: string | null;
  success?: string | null;
}

const AccountFeedback = ({ mustResetHint, error, success }: AccountFeedbackProps) => {
  return (
    <>
      {mustResetHint ? <p className="text-tagline-3 text-secondary/65 dark:text-accent/65">{mustResetHint}</p> : null}
      {error ? <p className="text-tagline-2 text-ns-red">{error}</p> : null}
      {success ? <p className="text-tagline-2 text-green-600 dark:text-green-400">{success}</p> : null}
    </>
  );
};

export default AccountFeedback;
