import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import TransactionList from "./TransactionList";
import CaretRightIcon from "../../assets/images/icon-caret-right.svg";
import CaretLeftIcon from "../../assets/images/icon-caret-left.svg";
import PaginationButton from "./PaginationButton";

export default function PaginatedTransactionList({ itemsPerPage, items }) {
  const [startIndex, setstartIndex] = useState(0);

  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setstartIndex(newOffset);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [startIndex]);

  return (
    <>
      <TransactionList
        data={currentItems}
        itemsPerPage={itemsPerPage}
        hideLastBorder={true}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<PaginationButton icon={CaretRightIcon} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={<PaginationButton icon={CaretLeftIcon} />}
        containerClassName="flex justify-center items-center gap-2 mt-300"
        pageLinkClassName="pagination-button border-beige-500"
        activeLinkClassName="bg-grey-900 border-grey-900 border text-white"
        breakClassName="pagination-button"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
