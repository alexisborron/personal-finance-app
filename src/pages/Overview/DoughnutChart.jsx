import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

const OUTER_COLORS = [
  "hsl(177 52% 32%)",
  "hsl(190 52% 68%)",
  "hsl(28 73% 81%)",
  "hsl(248 8% 41%)",
];
const INNER_COLORS = [
  "hsla(177, 52%, 32%, 0.75)",
  "hsla(190, 52%, 68%, 0.75)",
  "hsla(28, 73%, 81%, 0.75)",
  "hsla(248, 8%, 41%, 0.75)",
];

export default function DoughnutChart({ items = [] }) {
  const dataValues = items.map((item) => item.maximum);
  const dataLabels = items.map((item) => item.category);

  const data = {
    labels: dataLabels,
    datasets: [
      {
        // Outer ring
        data: dataValues,
        backgroundColor: OUTER_COLORS,
        borderWidth: 0,
        radius: "100%",
        cutout: "55%",
      },
      {
        // Inner ring
        data: dataValues,
        backgroundColor: INNER_COLORS,
        borderWidth: 0,
        radius: "100%",
        cutout: "67%",
      },
    ],
  };

  return (
    <div className="relative mx-auto mb-250 h-[240px] w-[240px]">
      <Doughnut
        data={data}
        options={{
          cutout: "20%",
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="mb-100 text-3xl font-bold">$338</p>
        <p className="text-grey-500 text-xs">of $975 limit</p>
      </div>
    </div>
  );
}
