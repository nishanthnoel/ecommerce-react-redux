// product form is used to add new product and edit a product
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";

function ProductForm() {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();
  const params = useParams(); // to extract thr parameters
  const selectedProduct = useSelector(selectProductById);
  const [openModal, setOpenModal]= useState(null)

  //This useEffect is just to fetch the product id.
  useEffect(() => {
    console.log(params.id)
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id)); //we fetch the value of the state selectedProductById here for this params
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  // This useEffect is to set the values in the field of the product that is selected
  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("images", selectedProduct.images);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("rating", selectedProduct.rating);
      setValue("price", selectedProduct.price);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    reset();
  };
  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const product = { ...data };
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          // product.rating = 0;  //default rating for new product
          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;

          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          console.log(product);

          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0; //if there is previous rating then we give the previous one
            dispatch(updateProductAsync(product));
            reset();
          } else {
            dispatch(createProductAsync(product));
            reset();
          }
          //TODO: if any product gets created in the form. The form should reset
        })}
      >
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-bold text-gray-900">Add Product</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {selectedProduct.deleted && <h2 className="text-red-600 col-span-full">This product is deleted</h2>}
              <div className="">
                <label
                  htmlFor="category"
                  className="block text-sm/6 font-semibold  text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    className="col-span-3 rounded-md"
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option>--choose category--</option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm/6 font-semibold  text-gray-900 "
                >
                  Brands
                </label>
                <div className="mt-2">
                  <select
                    className="col-span-3 rounded-md"
                    {...register("brand", {
                      required: "brand is required",
                    })}
                  >
                    <option>--choose brand--</option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-semibold  text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ">
                    <input
                      id="title"
                      // name="title"
                      {...register("title", {
                        required: "title is required",
                      })}
                      type="text"
                      className="block w-full rounded-md min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-semibold  text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm/6 font-semibold  text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ">
                    <input
                      id="price"
                      {...register("price", {
                        required: "price is required",
                        min: 0,
                        max: 100000,
                      })}
                      type="number"
                      className="block w-full rounded-md min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm/6 font-semibold  text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ">
                    <input
                      id="discountPercentage"
                      {...register("discountPercentage", {
                        required: "discount is required",
                        min: 0,
                        max: 100,
                      })}
                      type="number"
                      className="block w-full rounded-md min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm/6 font-semibold  text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ">
                    <input
                      id="stock"
                      {...register("stock", {
                        required: "stock is required",
                        min: 0,
                      })}
                      type="number"
                      className="block w-full rounded-md min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm/6 font-semibold  text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ">
                    <input
                      id="thumbnail"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      type="text"
                      className="block w-full rounded-md min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="image1"
                  className="block text-sm/6 font-semibold  text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ">
                    <input
                      id="image1"
                      {...register("image1", {
                        required: "image is required",
                      })}
                      type="text"
                      className="block w-full rounded-md min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="image2"
                  className="block text-sm/6 font-semibold  text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ">
                    <input
                      id="image2"
                      {...register("image2", {
                        required: "image is required",
                      })}
                      type="text"
                      className="block w-full rounded-md min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="image3"
                  className="block text-sm/6 font-semibold  text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ">
                    <input
                      id="image3"
                      {...register("image3", {
                        required: "image is required",
                      })}
                      type="text"
                      className="block w-full rounded-md min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Extra</h2>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">
                  By email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          defaultChecked
                          id="comments"
                          name="comments"
                          type="checkbox"
                          aria-describedby="comments-description"
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p id="comments-description" className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          aria-describedby="candidates-description"
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p id="candidates-description" className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          aria-describedby="offers-description"
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p id="offers-description" className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e)=>{e.preventDefault(); setOpenModal(true)}}
              type="button"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <Modal
        className="hidden"
        title={`Delete  ${selectedProduct.title}`}
        message="Are you sure you want to delete this Product"
        dangerOption="Delete"
        cancelOption="Cancel"
        dangerAction={handleDelete}
        cancelAction={() => setOpenModal(null)}
        showModal={openModal }
      ></Modal>
    </>
  );
}

export default ProductForm;
