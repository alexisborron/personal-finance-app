import { formatCurrency } from "../../utils/format";
import SummaryItem from "./SummaryItem";

export default function SummaryGrid({ items, labelKey, amountKey }) {
  return (
    <div className="grid grid-cols-2 gap-200 sm:flex-1">
      {items.slice(0, 4).map((item) => (
        <SummaryItem
          key={item[labelKey]}
          colorClass={item["theme"]}
          label={item[labelKey]}
          amount={formatCurrency(item[amountKey])}
        />
      ))}
    </div>
  );
}
