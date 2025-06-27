import { useState } from "react";
import SearchIcon from "../../assets/images/icon-search.svg";
import FilterIcon from "../../assets/images/icon-filter-mobile.svg";
import SortIcon from "../../assets/images/icon-sort-mobile.svg";
import PaginatedTransactionList from "./PaginatedTransactionList";

function TransactionsPage({ data }) {
  const [searchText, setSearchText] = useState("");
  const searchHandler = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };
  const filteredTransactions =
    searchText.trim() === ""
      ? data.transactions
      : data.transactions.filter((transaction) => {
          return transaction.name.toLowerCase().includes(searchText);
        });
  return (
    <main>
      <h1 className="text-heading mb-400">Transactions</h1>
      <section className="card-base bg-white py-250 sm:py-400">
        <div className="mb-50 flex items-center gap-250">
          <div className="relative flex flex-1 items-center">
            <img
              src={SearchIcon}
              className="absolute right-250 h-[16px] w-[16px]"
              alt="Search Icon"
            />
            <input
              type="search"
              className="border-beige-500 text-beige-500 w-full rounded-lg border-1 px-250 py-150 text-sm"
              onChange={searchHandler}
              value={searchText}
              placeholder="Search transactions..."
            ></input>
          </div>
          <img src={SortIcon} alt="Sort Icon" />
          <img src={FilterIcon} alt="Filter Icon" />
        </div>
        <PaginatedTransactionList
          itemsPerPage={10}
          items={filteredTransactions}
        />
      </section>
    </main>
  );
}

export default TransactionsPage;
