import { formatCurrency } from "../../utils/format";

export default function StatCard({ label, value }) {
  return (
    <section
      className={`card-base grow ${label === "Current Balance" ? "bg-grey-900 text-white" : "bg-white"}`}
    >
      <h2 className="text-label mb-150">{label}</h2>
      <span className="text-heading">{formatCurrency(value)}</span>
    </section>
  );
}
