import Button from "../../components/Button";
import { formatCurrency, formatCurrencyNoCents } from "../../utils/format";
export default function PotCardContent({ target, total, theme }) {
  const color = theme.slice(3);
  const progressPercent =
    target > 0 ? Math.min((total / target) * 100, 100) : 0;

  return (
    <>
      <div className="mb-100 flex items-center justify-between">
        <p className="text-grey-500 text-sm">Total Saved</p>
        <p className="text-[2rem] font-bold">{formatCurrency(total)}</p>
      </div>
      <progress
        className={`progress-${color} progress-track bg-beige-100 mb-50 h-2 w-full rounded-full`}
        value={progressPercent}
        max="100"
      ></progress>
      <div className="mb-500 flex items-center justify-between">
        <p className="text-grey-500 text-xs font-bold">
          {progressPercent.toFixed(2)}%
        </p>
        <p className="text-grey-500 text-xs">
          Target of {formatCurrencyNoCents(target)}
        </p>
      </div>
      <div className="flex w-full gap-200">
        <Button
          buttonStyles="secondary-button flex-1"
          buttonText="+ Add Money"
        />
        <Button buttonStyles="secondary-button flex-1" buttonText="Withdraw" />
      </div>
    </>
  );
}
