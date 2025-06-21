export default function BillCard({ label, amount, colorClass }) {
  return (
    <article className={`${colorClass} rounded-xl pl-1`}>
      <div className="bg-beige-100 flex w-full justify-between rounded-xl px-200 py-250">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-bold">{amount}</p>
      </div>
    </article>
  );
}
