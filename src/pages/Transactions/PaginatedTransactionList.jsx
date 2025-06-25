import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import TransactionList from "./TransactionList";

export default function PaginatedTransactionList({ itemsPerPage, items }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [itemOffset]);

  return (
    <>
      <TransactionList data={currentItems} itemsPerPage={10} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        containerClassName="flex justify-center gap-2 mt-4"
        pageLinkClassName="px-3 py-1 border rounded"
        activeLinkClassName="bg-grey-900 text-white"
        breakClassName="px-3 py-1"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
