export default function SummaryItem({ colorClass, label, amount }) {
  return (
    <div className="flex items-center gap-150">
      <div className={`${colorClass} h-10 w-1 rounded-full`}></div>
      <div>
        <p className="text-grey-500 text-xs">{label}</p>
        <p className="font-bold">{amount}</p>
      </div>
    </div>
  );
}
