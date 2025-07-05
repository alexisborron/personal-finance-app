import Button from "../../components/Button";
import { formatCurrency, formatCurrencyNoCents } from "../../utils/format";
export default function PotCardContent({ target, total, theme }) {
  return (
    <>
      <div className="mb-100 flex items-center justify-between">
        <p className="text-grey-500 text-sm">Total Saved</p>
        <p className="text-[2rem] font-bold">{formatCurrency(total)}</p>
      </div>
      <progress
        className={`bg-beige-100 progress-${theme} progress-track mb-50 h-2 w-full rounded-full`}
        value={(total / target) * 100}
        max="100"
      ></progress>
      <div className="mb-500 flex items-center justify-between">
        <p className="text-grey-500 text-xs font-bold">
          {((total / target) * 100).toFixed(2)}%
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
