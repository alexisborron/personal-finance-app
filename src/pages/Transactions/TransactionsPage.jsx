import { useState, useEffect, useRef } from "react";
import SearchIcon from "../../assets/images/icon-search.svg";
import FilterIcon from "../../assets/images/icon-filter-mobile.svg";
import SortIcon from "../../assets/images/icon-sort-mobile.svg";
import PaginatedTransactionList from "./PaginatedTransactionList";

function TransactionsPage({ data }) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [currentFilteredTransactions, setCurrentFilteredTransactions] =
    useState(data.transactions);

  const pageBeforeSearchRef = useRef(0);
  const isSearchingActiveRef = useRef(false);

  const searchHandler = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const wasSearchingActive = isSearchingActiveRef.current;
    isSearchingActiveRef.current = searchText.trim() !== "";

    const newFilteredTransactions =
      searchText.trim() === ""
        ? data.transactions
        : data.transactions.filter((transaction) => {
            return transaction.name.toLowerCase().includes(searchText);
          });
    setCurrentFilteredTransactions(newFilteredTransactions);

    if (isSearchingActiveRef.current && !wasSearchingActive) {
      pageBeforeSearchRef.current = currentPage;
      setCurrentPage(0);
    } else if (!isSearchingActiveRef.current && wasSearchingActive) {
      // Retrieve the page you saved from before you started searching
      let restoredPage = pageBeforeSearchRef.current;
      setCurrentPage(restoredPage);
    }
  }, [searchText, data.transactions, currentPage]);

  useEffect(() => {
    if (!isSearchingActiveRef.current) {
      pageBeforeSearchRef.current = currentPage;
    }
  }, [currentPage]);

  const handlePaginationClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

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
          items={currentFilteredTransactions}
          onPageChange={handlePaginationClick}
          initialPage={currentPage}
        />
      </section>
    </main>
  );
}

export default TransactionsPage;
