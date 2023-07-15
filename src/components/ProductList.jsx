import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesAsync,
  fetchProductsAsync,
} from "../features/productList/productListSlice";
import { Link } from "react-router-dom";
import {
  selectCurrentPage,
  selectItemsPerPage,
  setCurrentPage,
} from "../features/pagination/paginationSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, allCategories, status } = useSelector(
    (state) => state.productList
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the products for the current page
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  // const currentProducts = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductsAsync(selectedCategory));
  }, [dispatch, selectedCategory]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {status === "loading" && (
        <div className="flex items-center justify-center min-h-screen p-5 bg-white min-w-screen">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-indigo-500 rounded-full" />
            <div className="w-3 h-3 bg-indigo-500 rounded-full" />
            <div className="w-3 h-3 bg-indigo-500 rounded-full" />
          </div>
        </div>
      )}
      {status === "failed" && (
        <div className="flex items-center justify-center min-h-screen p-5 bg-white min-w-screen">
          <h1>Error!</h1>
        </div>
      )}
      <h1 className="text-2xl font-semibold text-center">Product Listing</h1>
      <div className="max-w-6xl mx-auto py-4">
        <div className="relative flex items-center w-full h-12 rounded-lg shadow-sm focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search products.."
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-6">
        <span className="text-sm font-semibold">
          Total {products.length} Products
        </span>
        <button className="relative text-sm focus:outline-none group mt-4 sm:mt-0">
          <div className="flex items-center justify-between w-40 h-10 px-3 border-2 border-gray-300 rounded hover:bg-gray-300">
            <span className="font-medium">{selectedCategory}</span>
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white shadow-lg rounded group-focus:flex">
            {selectedCategory != "All" && (
              <a
                onClick={() => setSelectedCategory("All")}
                className="w-full px-4 py-2 text-left hover:bg-gray-200"
              >
                All
              </a>
            )}
            {allCategories &&
              allCategories.map((category) => (
                <a
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  {category}
                </a>
              ))}
          </div>
        </button>
      </div>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6">
        {/* Product Tile Start */}
        {currentProducts &&
          currentProducts.map((product) => (
            <Link key={product.title} to={`/products/${product.id}`}>
              <div className="flex justify-center h-52 w-full rounded-lg shadow-lg ">
                <img
                  src={product.image}
                  className=" object-contain w-50 h-50"
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="font-medium">{product.title}</div>
                <span className="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">
                  ₹{product.price ?? 0.0}
                </span>
              </div>
            </Link>
          ))}
        {/* Product Tile End */}
      </div>
      <div className="flex justify-center mt-5 mb-5 space-x-1">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`flex items-center justify-center h-8 w-8 rounded ${
            currentPage === 1 ? "text-gray-400" : ""
          }`}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className={`flex items-center justify-center h-8 px-2 rounded text-sm font-medium ${
            currentPage === 1 ? "text-gray-400" : ""
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center h-8 px-2 rounded hover:bg-indigo-200 text-sm font-medium ${
            currentPage === totalPages ? "text-gray-400" : ""
          } hover:text-indigo-600`}
        >
          Next
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 ${
            currentPage === totalPages ? "text-gray-400" : ""
          } hover:text-indigo-600`}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default ProductList;
