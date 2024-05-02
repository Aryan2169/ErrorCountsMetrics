// Pagination.js

import React from 'react';
import { useContext } from "react"
import { UserContext } from "../context/UserContext.jsx"

const Pagination = () => {
  const {currentPage,setCurrentPage}=useContext(UserContext)

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center">
  <button
    className="bg-blue-500 text-white text-sm rounded-md px-2 py-1"
    onClick={handlePrevClick}
    disabled={currentPage === 1}
  >
    Prev
  </button>
  <span className="ml-2 text-sm">Page {currentPage}</span>
  <button
    className="ml-2 bg-blue-500 text-white text-sm rounded-md px-2 py-1"
    onClick={handleNextClick}
  >
    Next
  </button>
</div>

  );
};

export default Pagination;
