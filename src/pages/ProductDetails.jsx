import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync } from "../features/productDetails/productDetailsSlice";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, status } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error fetching product.</p>}
      {product && (
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
          <div className="container px-5  mx-auto" style={{ cursor: "auto" }}>
            <div className="flex justify-end py-4">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>

            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="product image"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={product.image}
                style={{ cursor: "auto" }}
              />
              <div
                className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                style={{ cursor: "auto" }}
              >
                <h1
                  className="text-gray-900 text-3xl title-font font-medium  mb-4"
                  style={{ cursor: "auto" }}
                >
                  {product.title}
                </h1>

                <p className="leading-relaxed">{product.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{product.price}
                  </span>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
