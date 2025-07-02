import useTransactionSearch from "../../hooks/useTransactionSearch";
import SearchIcon from "../../assets/images/icon-search.svg";
import FilterIcon from "../../assets/images/icon-filter-mobile.svg";
import SortIcon from "../../assets/images/icon-sort-mobile.svg";
import PaginatedTransactionList from "./PaginatedTransactionList";
import DropdownMenu from "../../components/DropdownMenu";

export default function TransactionsPage({ data }) {
  const {
    searchText,
    handleSearchChange,
    currentPage,
    handlePageChange,
    filteredTransactions,
    handleSelectedCategory,
    selectedCategory,
  } = useTransactionSearch(data.transactions);

  const sortOptions = [
    "Latest",
    "Oldest",
    "A to Z",
    "Z to A",
    "Highest",
    "Lowest",
  ];

  const filterCategories = [
    "All Categories",
    ...Array.from(new Set(data.transactions.map((t) => t.category))),
  ];

  return (
    <main>
      <h1 className="text-heading mb-400">Transactions</h1>
      <section className="card-base bg-white py-250 sm:py-400">
        <div className="relative mb-50 flex items-center gap-250">
          <div className="relative flex flex-1 items-center">
            <img
              src={SearchIcon}
              className="absolute right-250 h-[16px] w-[16px]"
              alt="Search Icon"
            />
            <input
              type="search"
              className="border-beige-500 text-beige-500 w-full rounded-lg border-1 px-250 py-150 text-sm"
              onChange={handleSearchChange}
              value={searchText}
              placeholder="Search transactions..."
            ></input>
          </div>
          <DropdownMenu
            buttonId={"sort-button"}
            menuId={"sort-menu"}
            menuItems={sortOptions}
            menuTitle="Sort By"
            icon={SortIcon}
            iconAltText={"Sort"}
          />
          <DropdownMenu
            buttonId={"filter-button"}
            menuId={"filter-menu"}
            menuItems={filterCategories}
            menuTitle="Category"
            icon={FilterIcon}
            iconAltText={"Filter"}
            handleSelectedCategory={handleSelectedCategory}
            selectedCategory={selectedCategory}
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
