type ModuleHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export default function ModuleHeader({
  title,
  description,
  eyebrow,
}: ModuleHeaderProps) {
  return (
    <div className="module-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
