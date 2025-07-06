import { formatCurrency } from "../../utils/format";
import PotIcon from "../../assets/images/icon-pot.svg";
import CaretRightIcon from "../../assets/images/icon-caret-right.svg";
import TransactionList from "../../components/TransactionList";
import StatCard from "./StatCard";
import SectionCard from "../../components/SectionCard";
import SummaryGrid from "./SummaryGrid";
import DoughnutChart from "../../components/DoughnutChart";
import BillCard from "./BillCard";
import OverviewCardHeader from "./OverviewCardHeader";

export default function OverviewPage({ data }) {
  const pots = data.pots;
  const budgets = data.budgets;
  const transactions = data.transactions;
  const billAmounts = [
    { label: "Paid Bills", amount: "$190.00", color: "bg-green" },
    { label: "Total Upcoming", amount: "$194.98", color: "bg-yellow" },
    { label: "Due Soon", amount: "$59.98", color: "bg-cyan" },
  ];
  const incomeAmounts = transactions
    .filter((t) => t.amount > 0)
    .map((t) => t.amount);

  const expenseAmounts = transactions
    .filter((t) => t.amount < 0)
    .map((t) => Math.abs(t.amount));

  const incomeTotal = incomeAmounts.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  const expensesTotal = expenseAmounts.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  const currentBalance = incomeTotal - expensesTotal;

  return (
    <main>
      <h1 className="text-heading">Overview</h1>
      {/* Stat Cards */}
      <div className="mt-400 mb-400 flex flex-col gap-150 sm:flex-row sm:gap-300">
        <StatCard label="Current Balance" value={currentBalance} />
        <StatCard label="Income" value={incomeTotal} />
        <StatCard label="Expenses" value={expensesTotal} />
      </div>
      {/* Pots (refers to savings pots) */}
      <SectionCard>
        <OverviewCardHeader
          title="Pots"
          linkText="See Details"
          srText=" about Pots"
          icon={CaretRightIcon}
          path={"/pots"}
        />
        <div className="sm:flex sm:gap-250">
          <div className="bg-beige-100 mb-250 flex min-w-0 rounded-xl p-300 sm:flex-1">
            <img className="mr-250" src={PotIcon} alt="Pot Icon" />
            <div>
              <h3 className="text-label break-words">Total Saved</h3>
              <p className="text-heading">
                {formatCurrency(pots.reduce((sum, pot) => sum + pot.total, 0))}
              </p>
            </div>
          </div>
          <SummaryGrid items={pots} labelKey="name" amountKey="total" />
        </div>
      </SectionCard>
      {/* Transactions */}
      <SectionCard>
        <OverviewCardHeader
          title="Transactions"
          linkText="View All"
          srText=" Transactions"
          icon={CaretRightIcon}
          path="/transactions"
        />
        <TransactionList data={transactions.slice(0, 5)} />
      </SectionCard>
      {/* Budgets */}
      <SectionCard>
        <OverviewCardHeader
          title="Budgets"
          linkText="See Details"
          srText=" about Budgets"
          icon={CaretRightIcon}
          path="/budgets"
        />
        <DoughnutChart
          classes="my-250"
          items={budgets}
          transactions={transactions}
        />
        <SummaryGrid items={budgets} labelKey="category" amountKey="maximum" />
      </SectionCard>
      {/* Bills */}
      <SectionCard>
        <OverviewCardHeader
          title="Recurring Bills"
          linkText="See Details"
          srText=" about Recurring Bills"
          icon={CaretRightIcon}
          path={"/bills"}
        />
        <div className="flex flex-col gap-[10px]">
          {billAmounts.map((bill) => (
            <BillCard
              key={bill.label}
              label={bill.label}
              amount={bill.amount}
              colorClass={bill.color}
            />
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
