import ModuleHeader from "@/components/ModuleHeader";
import { handbookTopics } from "@/lib/mockData";

export default function HandbookPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Handbook"
        description="Reserve a simple place for parent-facing policies, routines, and onboarding notes."
      />

      <section className="split-grid">
        {handbookTopics.map((topic) => (
          <article key={topic.id} className="card">
            <h3>{topic.title}</h3>
            <p>{topic.summary}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
