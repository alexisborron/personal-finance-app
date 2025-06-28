import { useState, useEffect, useRef } from "react";

function filterTransactions(transactions, searchText) {
  const search = searchText.trim().toLowerCase();
  if (search === "") {
    return transactions;
  } else {
    return transactions.filter((transaction) =>
      transaction.name.toLowerCase().includes(search),
    );
  }
}

export default function useTransactionSearch(allTransactions) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredTransactions, setFilteredTransactions] =
    useState(allTransactions);

  const pageBeforeSearchRef = useRef(0);
  const isSearchingRef = useRef(false);

  useEffect(() => {
    const newIsSearching = searchText.trim() !== "";
    const wasSearching = isSearchingRef.current;

    if (newIsSearching && !wasSearching) {
      // Started searching
      pageBeforeSearchRef.current = currentPage; // Save current page
      setCurrentPage(0); // Go to first page of search results
    } else if (!newIsSearching && wasSearching) {
      // Stopped searching (cleared search)
      setCurrentPage(pageBeforeSearchRef.current); // Restore saved page
    }

    isSearchingRef.current = newIsSearching; // Keep track of current search state for next render

    setFilteredTransactions(filterTransactions(allTransactions, searchText));
  }, [searchText, allTransactions, currentPage]);

  useEffect(() => {
    if (!isSearchingRef.current) {
      pageBeforeSearchRef.current = currentPage;
    }
  }, [currentPage]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return {
    searchText,
    handleSearchChange,
    currentPage,
    handlePageChange,
    filteredTransactions,
  };
}
