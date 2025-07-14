import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useTransactionSearch from "../../hooks/useTransactionSearch";
import InputField from "../../components/InputField";
import FilterIcon from "../../assets/images/icon-filter-mobile.svg";
import SortIcon from "../../assets/images/icon-sort-mobile.svg";
import PaginatedTransactionList from "./PaginatedTransactionList";
import DropdownMenu from "../../components/DropdownMenu";

export default function TransactionsPage({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromURL = searchParams.get("category");
  const {
    searchText,
    handleSearchChange,
    currentPage,
    handlePageChange,
    filteredTransactions,
    handleSelectedCategory,
    selectedCategory,
    handleSortChange,
    sortOption,
  } = useTransactionSearch(data.transactions, categoryFromURL);

  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuChange = (menuName, isOpen) => {
    if (isOpen) {
      setOpenMenu(menuName);
    } else {
      setOpenMenu(null);
    }
  };

  const handleCategoryChange = (category) => {
    handleSelectedCategory(category);

    // Update the URL query param
    if (category === "All Transactions") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const sortOptions = [
    "Latest",
    "Oldest",
    "A to Z",
    "Z to A",
    "Highest",
    "Lowest",
  ];

  const filterCategories = [
    "All Transactions",
    ...Array.from(new Set(data.transactions.map((t) => t.category))),
  ];

  useEffect(() => {
    setOpenMenu(null);
  }, [sortOption, selectedCategory]);

  return (
    <main>
      <h1 className="text-heading">Transactions</h1>
      <section className="card-base mt-400 bg-white py-250 sm:py-400">
        <div className="relative mb-50 flex items-center gap-250">
          <InputField
            searchHandler={handleSearchChange}
            value={searchText}
            placeholder="Search transactions"
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
            isOpen={openMenu === "sort"}
            onToggle={(isOpen) => handleMenuChange("sort", isOpen)}
          />
          <DropdownMenu
            buttonId={"filter-button"}
            menuId={"filter-menu"}
            menuItems={filterCategories}
            menuTitle="Category"
            icon={FilterIcon}
            ariaLabel="Open Filter Categories Menu"
            handleSelection={handleCategoryChange}
            selectedItem={selectedCategory}
            isOpen={openMenu === "filter"}
            onToggle={(isOpen) => handleMenuChange("filter", isOpen)}
          />
        </div>
        <PaginatedTransactionList
          itemsPerPage={10}
          items={filteredTransactions}
          onPageChange={handlePageChange}
          initialPage={currentPage}
        />
      </section>
    </main>
  );
}
