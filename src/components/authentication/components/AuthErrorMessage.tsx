interface AuthErrorMessageProps {
  message: string | null;
}

const AuthErrorMessage = ({ message }: AuthErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return <p className="text-tagline-3 text-ns-red mt-3">{message}</p>;
};

export default AuthErrorMessage;
