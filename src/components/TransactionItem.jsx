import { formatTransaction, formatDate } from "../utils/format";

export default function TransactionItem({ avatar, name, amount, date }) {
  return (
    <article key={name}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-200">
          {avatar && (
            <img className="h-10 w-10 rounded-full" src={avatar} alt={name} />
          )}
          <p className="text-sm font-bold">{name}</p>
        </div>

        <div className="text-right">
          <p
            className={`text-sm font-bold ${amount > 0 ? "text-green" : "text-grey-900"}`}
          >
            {formatTransaction(amount)}
          </p>
          <p className="text-grey-500 text-xs">{formatDate(date)}</p>
        </div>
      </div>
    </article>
  );
}
