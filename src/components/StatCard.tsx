type StatCardProps = {
  title: string;
  value: string;
  detail?: string;
};

export default function StatCard({ title, value, detail }: StatCardProps) {
  return (
    <article className="card stat-card">
      <p className="stat-label">{title}</p>
      <strong className="stat-value">{value}</strong>
      {detail ? <span className="stat-detail">{detail}</span> : null}
    </article>
  );
}
