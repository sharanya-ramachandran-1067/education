type EmptyStateProps = {
  title: string;
  description: string;
  hint?: string;
};

export default function EmptyState({
  title,
  description,
  hint,
}: EmptyStateProps) {
  return (
    <section className="card empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {hint ? <span>{hint}</span> : null}
    </section>
  );
}
