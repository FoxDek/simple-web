import React from "react";
import { cva } from "class-variance-authority";

const pagination = cva("flex gap-1.5 p-2 justify-center");

const paginationItem = cva(
  "w-6 h-auto aspect-square text-xs font-medium border rounded-md transition-all ease-in-out flex items-center justify-center",
  {
    variants: {
      active: {
        true: "bg-[#447bba] text-white border-[#447bba] shadow-sm",
        false:
          "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-[#447bbacb] cursor-pointer",
      },
    },
  }
);

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  total,
  onChange,
}) => {
  const handleChangePage = (newPage: number) => {
    onChange(newPage);
  };

  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <ul className={pagination()}>
      {totalPages <= 5 ? (
        [...Array(totalPages)].map((_, i) => (
          <li
            key={i}
            className={paginationItem({ active: i + 1 === currentPage })}
            onClick={() => handleChangePage(i + 1)}
          >
            {i + 1}
          </li>
        ))
      ) : (
        <>
          {currentPage > 2 && (
            <li
              className={paginationItem({ active: false })}
              onClick={() => handleChangePage(1)}
            >
              1
            </li>
          )}

          {currentPage > 3 && (
            <li
              className={paginationItem({
                className: "border-none !px-0 text-gray-500",
              })}
            >
              ...
            </li>
          )}

          {currentPage > 1 && (
            <li
              className={paginationItem({ active: false })}
              onClick={() => handleChangePage(currentPage - 1)}
            >
              {currentPage - 1}
            </li>
          )}

          <li className={paginationItem({ active: true })}>{currentPage}</li>

          {currentPage < totalPages && (
            <li
              className={paginationItem({ active: false })}
              onClick={() => handleChangePage(currentPage + 1)}
            >
              {currentPage + 1}
            </li>
          )}

          {currentPage === 1 && currentPage + 2 <= totalPages && (
            <li
              className={paginationItem({ active: false })}
              onClick={() => handleChangePage(currentPage + 2)}
            >
              {currentPage + 2}
            </li>
          )}

          {currentPage < totalPages - 2 && (
            <li
              className={paginationItem({
                className: "border-none !px-0 text-gray-500",
              })}
            >
              ...
            </li>
          )}

          {currentPage < totalPages - 1 && (
            <li
              className={paginationItem({ active: false })}
              onClick={() => handleChangePage(totalPages)}
            >
              {totalPages}
            </li>
          )}
        </>
      )}
    </ul>
  );
};

export default Pagination;