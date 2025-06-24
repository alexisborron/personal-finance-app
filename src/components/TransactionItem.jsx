import { formatTransaction, formatDate } from "../utils/format";

export default function TransactionItem({ avatar, name, amount, date }) {
  return (
    <li>
      <article className="border-grey-100 border-b-1 py-200" key={name}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-200">
            <img className="h-10 w-10 rounded-full" src={avatar} alt={name} />
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
    </li>
  );
}
