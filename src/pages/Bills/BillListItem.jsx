import PaidIcon from "../../assets/images/icon-bill-paid.svg";
import DueIcon from "../../assets/images/icon-bill-due.svg";
import { getOrdinalSuffix } from "../../utils/helpers";
import { formatCurrency } from "../../utils/format";

export default function BillListItem({ bill }) {
  const dayNumber = bill.dayNumber;

  return (
    <li className="list-none">
      <article className="border-grey-100 border-b py-200">
        <div className="mb-100 flex items-center gap-200">
          <img
            className="h-[32px] w-[32px] rounded-full"
            src={bill.avatar}
            alt={bill.name}
          />
          <p className="text-sm font-bold">{bill.name}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-100">
            <p className="text-green text-xs">
              Monthly - {`${dayNumber}${getOrdinalSuffix(dayNumber)}`}
            </p>
            {bill.status === "paid" && (
              <img src={PaidIcon} alt="Bill Paid" title="Paid" />
            )}
            {bill.status === "dueSoon" && (
              <img src={DueIcon} alt="Bill Due Soon" title="Due soon" />
            )}
          </div>
          <p
            className={`text-sm font-bold ${
              bill.status === "dueSoon" ? "text-red" : ""
            }`}
          >
            {formatCurrency(bill.amount)}
          </p>
        </div>
      </article>
    </li>
  );
}
