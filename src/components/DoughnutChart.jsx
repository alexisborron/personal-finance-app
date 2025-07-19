import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { calculateBudgetSpentAndRemaining } from "../utils/helpers";
import { formatCurrencyNoCents } from "../utils/format";

ChartJS.register(ArcElement);

export default function DoughnutChart({
  items: budgets = [],
  classes = "",
  transactions,
}) {
  const dataValues = budgets.map((budget) => budget.maximum);
  const dataLabels = budgets.map((budget) => budget.category);

  const OUTER_COLORS = budgets.map((budget) => budget.colorValue);

  const INNER_COLORS = budgets.map((budget) =>
    budget.colorValue.replace(/^hsl\((.+)\)$/, "hsla($1 / 0.75)"),
  );

  const budgetTotal = dataValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  const totalSpentAcrossAllBudgets = budgets.reduce((acc, budget) => {
    const { totalSpent } = calculateBudgetSpentAndRemaining(
      budget,
      transactions,
    );
    return acc + totalSpent;
  }, 0);

  const data = {
    labels: dataLabels,
    datasets: [
      {
        // Outer ring
        data: dataValues,
        backgroundColor: OUTER_COLORS,
        hoverBackgroundColor: OUTER_COLORS,
        borderWidth: 0,
        radius: "100%",
        cutout: "55%",
      },
      {
        // Inner ring
        data: dataValues,
        backgroundColor: INNER_COLORS,
        hoverBackgroundColor: INNER_COLORS,
        borderWidth: 0,
        radius: "100%",
        cutout: "67%",
      },
    ],
  };

  return (
    <div className={`${classes} relative mx-auto h-[240px] w-[240px]`}>
      <Doughnut
        data={data}
        options={{
          cutout: "20%",
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="mb-100 text-3xl font-bold">
          {formatCurrencyNoCents(totalSpentAcrossAllBudgets)}
        </p>
        <p className="text-grey-500 text-xs">of ${budgetTotal} limit</p>
      </div>
    </div>
  );
}
