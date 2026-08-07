import ModuleHeader from "@/components/ModuleHeader";
import { feeItems } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

export default function FeesPage() {
  return (
    <div className="stack-lg">
      <ModuleHeader
        title="Fees"
        description="Prepare simple fee collection, receipt generation, and parent balance visibility."
      />

      <section className="card">
        <h3>Sample fee items</h3>
        <ul className="list">
          {feeItems.map((item) => (
            <li key={item.id} className="list-row">
              <div>
                <strong>{item.label}</strong>
                <p>{formatCurrency(item.amount)}</p>
              </div>
              <span>{item.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
