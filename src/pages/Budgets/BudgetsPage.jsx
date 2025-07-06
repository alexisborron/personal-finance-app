import Button from "../../components/Button";
import DoughnutChart from "../../components/DoughnutChart";
import SectionCard from "../../components/SectionCard";
import CategoryCardHeader from "../../components/CategoryCardHeader";
import BudgetCardContent from "../Budgets/BudgetCardContent";
import { formatCurrency } from "../../utils/format";
import { calculateBudgetSpentAndRemaining } from "../../utils/helpers";

export default function BudgetsPage({ data }) {
  const budgets = data.budgets;
  const transactions = data.transactions;

  const alphabeticalBudgetList = [...budgets].sort((a, b) =>
    a.category.localeCompare(b.category),
  );

  return (
    <main>
      <div className="mb-400 flex items-center justify-between">
        <h1 className="text-heading">Budgets</h1>
        <Button buttonStyles="primary-button" buttonText="+ Add New Budget" />
      </div>
      <section className="card-base mb-300 bg-white">
        <DoughnutChart
          classes="mt-300 mb-500"
          items={budgets}
          transactions={transactions}
        />
        <h2 className="text-heading-secondary mb-300">Spending Summary</h2>
        <ul>
          {alphabeticalBudgetList.map((budget, index) => {
            const { totalSpent } = calculateBudgetSpentAndRemaining(
              budget,
              transactions,
            );

            return (
              <li
                key={`${budget}-${index}`}
                className="text-grey-500 border-grey-100 flex items-center justify-between border-b py-200 last:border-b-0 last:pb-0"
              >
                <div className="flex gap-150">
                  <div
                    className={`${budget.theme} h-[21px] w-1 rounded-full`}
                  ></div>
                  <p className="text-sm">{budget.category}</p>
                </div>
                <p className="flex items-center gap-100">
                  <span className="text-grey-900 align-baseline text-base font-bold">
                    {formatCurrency(totalSpent)}
                  </span>
                  <span className="text-grey-500 text-xs">
                    of {formatCurrency(budget.maximum)}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </section>
      {budgets.map((budget, index) => {
        const { totalSpent, remaining } = calculateBudgetSpentAndRemaining(
          budget,
          transactions,
        );

        return (
          <SectionCard key={`${budget.category}-${index}`}>
            <CategoryCardHeader
              headingText={budget.category}
              theme={budget.theme}
              menuItems={["Edit Budget", "Delete Budget"]}
              ariaLabelText="Open Edit Budget Menu"
            />
            <BudgetCardContent
              budget={budget}
              transactions={transactions}
              totalSpent={totalSpent}
              remaining={remaining}
            />
          </SectionCard>
        );
      })}
    </main>
  );
}
