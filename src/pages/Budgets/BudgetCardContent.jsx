import { formatCurrency } from "../../utils/format";
import SummaryItem from "../../components/SummaryItem";
import TransactionItem from "../../components/TransactionItem";
import { Link, createSearchParams } from "react-router-dom";
import CaretRightIcon from "../../assets/images/icon-caret-right.svg";

export default function BudgetCardContent({
  budget,
  transactions,
  totalSpent,
  remaining,
}) {
  const filteredLatestTransactions = transactions
    .filter((transaction) => transaction.category === budget.category)
    .sort((a, b) => b.date.localeCompare(a.date));
  const progressPercent =
    budget.maximum > 0 ? Math.min((totalSpent / budget.maximum) * 100, 100) : 0;

  return (
    <>
      <p className="text-grey-500 mb-200">
        Maximum of {formatCurrency(budget.maximum)}
      </p>
      <progress
        className={`budget-progress-track budget-progress-${budget.theme.slice(3)} bg-beige-100 mb-200 h-400 w-full rounded-sm p-1`}
        value={progressPercent}
        max="100"
      ></progress>
      <div className="mb-200 flex">
        <div className="w-1/2">
          <SummaryItem
            colorClass={budget.theme}
            label="Spent"
            amount={totalSpent}
          />
        </div>
        <div className="w-1/2">
          <SummaryItem
            colorClass={`bg-beige-100`}
            label="Free"
            amount={remaining}
          />
        </div>
      </div>
      <div className="bg-beige-100 rounded-xl p-200">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold">Latest Spending</h3>
          <Link
            className="text-label flex items-center text-gray-500"
            to={{
              pathname: "/transactions",
              search: createSearchParams({
                category: budget.category,
              }).toString(),
            }}
          >
            See All
            <span className="sr-only">" of Latest Transactions"</span>
            <img
              className="ml-150 inline w-[4.5px]"
              src={CaretRightIcon}
              alt=""
            />
          </Link>
        </div>
        <ul>
          {filteredLatestTransactions.slice(0, 3).map((t, index) => (
            <li
              key={index}
              className="border-b border-gray-200 py-200 last:border-0 last:pb-0"
            >
              <TransactionItem name={t.name} amount={t.amount} date={t.date} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
