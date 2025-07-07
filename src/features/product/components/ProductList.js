// src/features/counter/Counter.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Correct single import
// import { selectAllProducts } from "../productSlice";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  selectAllProducts,
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
  selectTotalItems,
  selectCategories,
  selectBrands,
  fetchCategoriesAsync,
  fetchBrandsAsync,
  selectProductListStatus,
} from "../productSlice";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constants";
import Pagination from "../../common/Pagination";
import LoaderSpinner from "../../common/LoaderSpinner";

// const sortOptions = [
//   { name: "Best Rating", sort: "-rating", current: false },
//   { name: "Price: Low to High", sort: "price", current: false },
//   { name: "Price: High to Low", sort: "-price", current: false }, // order: "desc" this didnt work in my json server   // this is for latest json server
// ];
const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false }, // order: "desc" this didnt work in my json server
];
// const subCategories = [
//   { name: "Totes", href: "#" },
//   { name: "Backpacks", href: "#" },
//   { name: "Travel Bags", href: "#" },
//   { name: "Hip Bags", href: "#" },
//   { name: "Laptop Sleeves", href: "#" },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const products = useSelector(selectAllProducts); // Access the products array from Redux state
  const totalItems = useSelector(selectTotalItems);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const status = useSelector(selectProductListStatus);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
    // {
    //   id: "size",
    //   name: "Size",
    //   options: [
    //     { value: "2l", label: "2L", checked: false },
    //     { value: "6l", label: "6L", checked: false },
    //     { value: "12l", label: "12L", checked: false },
    //     { value: "18l", label: "18L", checked: false },
    //     { value: "20l", label: "20L", checked: false },
    //     { value: "40l", label: "40L", checked: true },
    //   ],
    // },
  ];

  const handleFilter = (e, section, option) => {
    // e.preventDefault(); // do not do this  doesnt check the checkbox for one click
    //TODO: handle multiple categories
    // console.log(option.value, section.id); // furniture category

    // const newFilter = { ...filter,[section.id] : option.value };
    //or
    //  this method is used to unchecked the checkbox and remove the filter from the filter object when not checked
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value); // // CATEGORY  is section.id: "beauty" is option.value
        // newFilter[section.id]= [...newFilter[section.id], option.value];
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (item) => item === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    // console.log({ newFilter });
    setFilter(newFilter);
    // dispatch(fetchProductsByFiltersAsync(filter)); // by this method we used to get the ui updated when clicked twice
    // dispatch(fetchProductsByFiltersAsync({ filter: newFilter, sort })); // Dispatch the action with the updated filter and sort. 2.11 problem solved
    // console.log(option.value, section.id); // furniture category
  };
  // option andre product
  //section andre brand/category

  const handleSort = (e, option) => {
    // e.preventDefault(); // do not do this  doesnt check the checkbox for one click
    // const newFilter = { ...filter, _sort: option.sort, _order : option.order };
    // const newSort = { _sort: option.sort}; // used for latest version of json server
    const newSort = { _sort: option.sort, _order: option.order };
    // console.log(newSort);
    setSort(newSort);
    // dispatch(fetchProductsByFiltersAsync({ filter, sort: newSort })); // Dispatch the action with the updated filter and sort
  };
  const handlePage = (page) => {
    // console.log(page);
    setPage(page);
    dispatch(
      fetchProductsByFiltersAsync({
        filter,
        sort,
        pagination: { _page: page, _limit: ITEMS_PER_PAGE },
      })
    ); // Dispatch the action with the updated page
  };

  // useEffect(() => {
  //   console.log("Fetching products...");
  //   dispatch(fetchAllProductsAsync());
  // }, [dispatch]);   // this is no longer needed as we are fetching products by filters. which also runs when the page loads.

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
    //TODO: server will filter the deleted products
  }, [filter, sort, dispatch, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
  }, []);

  // console.log("Products state:", products);
  return (
    <div>
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <MobileFilter
              handleFilter={handleFilter}
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
              filters={filters}
            ></MobileFilter>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  All Products
                </h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <MenuItem key={option.name}>
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                              )}
                            >
                              {option.name}
                            </p>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon aria-hidden="true" className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pt-6 pb-24"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters Desktop*/}
                  <DesktopFilter
                    handleFilter={handleFilter}
                    filters={filters}
                  ></DesktopFilter>

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {" "}
                    {/* This is our product page  */}
                    <ProductGrid
                      products={products}
                      status={status}
                      // LoaderSpinner={LoaderSpinner}
                    ></ProductGrid>
                  </div>
                  {/* Product Grid End */}
                </div>
              </section>
              {/* The section of products and filters end here */}
              <div>
                <Pagination
                  page={page}
                  setPage={setPage}
                  handlePage={handlePage}
                  totalItems={totalItems}
                ></Pagination>
              </div>
            </main>
          </div>
        </div>

        {/* This is our product page 
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {" "}
              Products{" "}
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <img
                    alt={product.imageAlt}
                    src={product.thumbnail}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <div>
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              {/* <h3 className="sr-only">Categories</h3> */}
              {/* <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul> */}

              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                defaultChecked={option.checked}
                                defaultValue={option.value}
                                // checked={option.checked}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                //  onChange={(e) => {
                                //   console.log(e.target.value); // Log the checkbox state when it's changed
                                //   // dispatch(toggleCheckbox(e.target.checked)); // Dispatch the Redux action
                                // }}
                                onChange={(e) =>
                                  handleFilter(e, section, option)
                                }
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
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="min-w-0 flex-1 text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

function DesktopFilter({ handleFilter, filters }) {
  return (
    <form className="hidden lg:block">
      {/* <h3 className="sr-only">Categories</h3> */}
      {/* <ul
      role="list"
      className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
    >
      {subCategories.map((category) => (
        <li key={category.name}>
          <a href={category.href}>{category.name}</a>
        </li>
      ))}
    </ul> */}

      {filters.map((section) => (
        <Disclosure
          key={section.id}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="size-5 group-data-open:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="size-5 group-not-data-open:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-3">
                  <div className="flex h-5 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultValue={option.value}
                        defaultChecked={option.checked}
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        onChange={(e) => handleFilter(e, section, option)}
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
                  <label
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  );
}

function ProductGrid({ products, status, LoaderSpinner}) {
  return (
    <>
      <div className="bg-white  min-w-screen  min-h-screen flex items-center justify-center">
        {status === "loading" ? (
          <div className="  w-32 h-auto  flex items-center justify-center rounded-lg object-cover lg:block">
        <img
            alt="loading..."
            src="/fade-stagger-circles.svg"  
            className="  rounded-lg object-cover lg:block"
          />
            </div>
        ) : null}
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <Link to={`/product-detail/${product.id}`}>
                <div
                  key={product.id}
                  className="group relative  border-solid border-2 border-gray-200 p-2"
                >
                  {/* <div className="min-h-60 lg:h-60"> */}
                  <div className="min-h-60 ">
                    <img
                      alt={product.title}
                      src={product.thumbnail}
                      className=" aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <div href={product.thumbnail}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </div>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 flex items-center">
                        <StarIcon className=" w-6 h-6 inline"></StarIcon>
                        <span className="align-bottom p-1">
                          {product.rating}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm block font-medium text-gray-900">
                        $ {discountedPrice(product)}
                      </p>
                      <p className="text-sm block font-medium text-gray-400 line-through">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                  {product.deleted && (
                    <div>
                      <p className="text-sm text-red-600">Product Deleted</p>
                    </div>
                  )}
                  {product.stock <= 0 && (
                    <div>
                      <p className="text-sm text-red-600">Out Of Stock</p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
