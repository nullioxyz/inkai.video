interface CreditsSummaryCardsProps {
  usedCredits: number;
  creditBalance: number;
  usedLabel: string;
  remainingLabel: string;
}

const CreditsSummaryCards = ({ usedCredits, creditBalance, usedLabel, remainingLabel }: CreditsSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <article className="border-stroke-3 dark:border-stroke-7 rounded-[12px] border p-4">
        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{usedLabel}</p>
        <p className="text-heading-5 text-secondary dark:text-accent font-normal">{usedCredits}</p>
      </article>
      <article className="border-stroke-3 dark:border-stroke-7 rounded-[12px] border p-4">
        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{remainingLabel}</p>
        <p className="text-heading-5 text-secondary dark:text-accent font-normal">{creditBalance}</p>
      </article>
    </div>
  );
};

export default CreditsSummaryCards;
