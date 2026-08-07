import ModuleHeader from "@/components/ModuleHeader";
import { portalHighlights } from "@/lib/mockData";

export default function PortalPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Parent Portal"
        description="The scaffold includes a dedicated parent portal so families can access updates without relying on WhatsApp."
      />

      <section className="split-grid">
        {portalHighlights.map((item) => (
          <article key={item.id} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
