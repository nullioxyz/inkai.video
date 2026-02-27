import Link from 'next/link';

interface AuthBackLinkProps {
  href: string;
  label: string;
}

const AuthBackLink = ({ href, label }: AuthBackLinkProps) => {
  return (
    <Link
      href={href}
      className="border-stroke-7 text-tagline-2 text-accent/85 hover:bg-background-7 hover:text-accent inline-flex items-center gap-2 rounded-full border px-5 py-2.5 transition">
      <span aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M15 6 9 12l6 6" />
        </svg>
      </span>
      <span>{label}</span>
    </Link>
  );
};

export default AuthBackLink;
