interface AuthTitleBlockProps {
  title: string;
  description: string;
}

const AuthTitleBlock = ({ title, description }: AuthTitleBlockProps) => {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-heading-6 text-accent">{title}</h1>
      <p className="text-tagline-3 text-accent/70 mt-2">{description}</p>
    </div>
  );
};

export default AuthTitleBlock;
