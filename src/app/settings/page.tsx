import ModuleHeader from "@/components/ModuleHeader";
import { schema } from "@/data/schema";
import { settingsGroups } from "@/lib/mockData";

export default function SettingsPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Settings"
        description="Keep school setup flexible while preserving a clear path for future integrations like Zoho Cliq."
      />

      <section className="split-grid">
        {settingsGroups.map((group) => (
          <article key={group.id} className="card">
            <h3>{group.title}</h3>
            <p>{group.description}</p>
          </article>
        ))}
      </section>

      <section className="card">
        <h3>Schema placeholders</h3>
        <ul className="list compact-list">
          {schema.map((table) => (
            <li key={table.name} className="list-row">
              <div>
                <strong>{table.name}</strong>
                <p>{table.description}</p>
              </div>
              <span>{table.fields.length} fields</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
