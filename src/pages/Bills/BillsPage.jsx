import { useState } from "react";
import useTransactionSearch from "../../hooks/useTransactionSearch";
import RecurringBillsIcon from "../../assets/images/icon-recurring-bills.svg";
import InputField from "../../components/InputField";
import DropdownMenu from "../../components/DropdownMenu";
import SortIcon from "../../assets/images/icon-sort-mobile.svg";
import BillListItem from "../Bills/BillListItem";
import { formatCurrency } from "../../utils/format";
import {
  getCurrentMonthBillDate,
  getDaysDifference,
  getBillStatus,
} from "../../utils/helpers";

export default function BillsPage({ data: transactions }) {
  const {
    searchText,
    filteredTransactions,
    handleSearchChange,
    handleSortChange,
    sortOption,
  } = useTransactionSearch(transactions);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  const sortOptions = [
    "Due Date (Earliest First)",
    "Due Date (Latest First)",
    "A to Z",
    "Z to A",
  ];

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const recurringBills = [...filteredTransactions].filter((t) => t.recurring);

  const processedBills = recurringBills.map((t) => {
    const originalBillDate = new Date(t.date);
    const currentMonthBillDate = getCurrentMonthBillDate(
      currentDate,
      originalBillDate,
    );
    const daysDifference = getDaysDifference(currentDate, currentMonthBillDate);

    const status = getBillStatus(
      currentDate,
      currentMonthBillDate,
      daysDifference,
    );

    return {
      ...t,
      status,
      dayNumber: originalBillDate.getUTCDate(),
      daysDifference,
    };
  });

  const totalAmount = recurringBills.reduce((sum, t) => sum + t.amount, 0);

  const summary = processedBills.reduce(
    (acc, t) => {
      if (acc[t.status]) {
        acc[t.status].count++;
        acc[t.status].total += t.amount;
      }
      return acc;
    },
    {
      paid: { count: 0, total: 0 },
      dueSoon: { count: 0, total: 0 },
      upcoming: { count: 0, total: 0 },
    },
  );

  return (
    <main>
      <h1 className="text-heading">Recurring Bills</h1>
      <div className="mt-400 mb-300 flex flex-col gap-150 sm:flex-row sm:gap-300">
        <section className="bg-grey-900 flex-1 rounded-xl px-250 py-300 text-white sm:px-300">
          <div className="flex items-center gap-250 sm:flex-col sm:items-start sm:gap-400">
            <div className="flex h-[40px] w-[40px] items-center justify-center">
              <img src={RecurringBillsIcon} alt="" />
            </div>
            <div>
              <h2 className="text-label mb-150">Total Bills</h2>
              <span className="text-heading">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>
        </section>
        <section className="flex-1 rounded-xl bg-white p-250">
          <h2 className="text-base font-bold">Summary</h2>
          <ul className="text-xs">
            <li className="border-grey-100 flex justify-between border-b py-200">
              <span className="text-grey-500">Paid Bills</span>
              <span className="font-bold">{`${summary.paid.count} (${formatCurrency(summary.paid.total)})`}</span>
            </li>
            <li className="border-grey-100 flex justify-between border-b py-200">
              <span className="text-grey-500">Total Upcoming</span>
              <span className="font-bold">{`${summary.upcoming.count} (${formatCurrency(summary.upcoming.total)})`}</span>
            </li>
            <li className="border-grey-100 text-red flex justify-between border-b py-200 last:border-b-0 last:pb-0">
              <span>Due Soon</span>
              <span className="font-bold">{`${summary.dueSoon.count} (${formatCurrency(summary.dueSoon.total)})`}</span>
            </li>
          </ul>
        </section>
      </div>
      <section className="card-base bg-white">
        <div className="flex items-center gap-250">
          <InputField
            type="search"
            onChange={handleSearchChange}
            value={searchText}
            placeholder="Search bills"
          />
          <DropdownMenu
            buttonId={"sort-button"}
            menuId={"sort-menu"}
            menuItems={sortOptions}
            menuTitle="Sort By"
            icon={SortIcon}
            ariaLabel="Open Sort Options Menu"
            handleSelection={handleSortChange}
            selectedItem={sortOption}
            isOpen={isOpen}
            onToggle={handleOpenChange}
          />
        </div>
        <ul className="mt-100">
          {processedBills.map((bill, index) => {
            return <BillListItem key={`${bill.name}-${index}`} bill={bill} />;
          })}
        </ul>
      </section>
    </main>
  );
}
