import PropTypes from "prop-types";

function Pagination({ page, handlePrevClick, handleNextClick }) {
  return (
    <div className="flex justify-center items-center mt-4 font-sans">
      <button
        className={` ${
          page !== 1 ? "bg-purpleTheme hover:bg-yellowTheme" : "bg-gray-400"
        } text-white font-bold py-2 px-4 rounded mr-2 ${
          page === 1 ? "cursor-not-allowed" : ""
        }`}
        onClick={handlePrevClick}
        disabled={page === 1}
      >
        Prev
      </button>
      <h1>{page}/11</h1>
      <button
        className={` ${
          page !== 11 ? "bg-purpleTheme hover:bg-yellowTheme" : "bg-gray-400"
        } text-white font-bold py-2 px-4 ml-2 rounded ${
          page === 11 ? "cursor-not-allowed" : ""
        }`}
        onClick={handleNextClick}
        disabled={page === 11}
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
};

export default Pagination;
