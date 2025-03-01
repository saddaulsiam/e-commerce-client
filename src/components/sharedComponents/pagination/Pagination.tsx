import { Button } from "@/components/ui/button";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Generate an array of page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="btn-group">
        {pageNumbers.map((number) => (
          <Button
            key={number}
            className={`btn btn-sm ${
              currentPage === number ? "btn-active" : ""
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Pagination;
