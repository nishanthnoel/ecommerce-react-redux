// src/features/counter/Counter.js
import { useDispatch, useSelector } from "react-redux";
import {
  selectItems,
  updateCartAsync,
  deleteItemFromCartAsync,
} from "./cartSlice";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";
import Modal from "../common/Modal";
import { fetchItemsByUserId } from "./cartAPI";
import { selectLoggedInUser } from "../auth/authSlice";

function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true); // this is not related to modalopen and clse
  const items = useSelector(selectItems);
  const [openModal, setOpenModal] = useState(null);
  // console.log(items) //this is returning  array of items
  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  // const totalPrice = items.reduce((accumulator, currentItem) => {
  //   return accumulator + (currentItem.price * currentItem.quantity);
  // }, 0);

  const handleQuantity = (e, item) => {
    e.preventDefault();
    // console.log(items);
    dispatch(updateCartAsync({id:item.id, quantity: +e.target.value })); // error was i was sending items instead of item
  };
  // console.log(items);

  const handleRemove = (e, id) => {
    if (e && e.preventDefault) e.preventDefault(); // error: e is undefinedfor just e.preventDefault()
    dispatch(deleteItemFromCartAsync(id));
    setOpenModal(null); // Optionally close the modal after delete
  };

  return (
    <div>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}

      <div className="mx-auto mt-20 bg-gray-200 max-w-7xl px-4 sm:px-6 lg:px-8 rounded-md border border-transparent">
        {/* <h2 className="text-3xl font-bold">Cart</h2> */}

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight my-2 text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={item.product.thumbnail}
                      src={item.product.title}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <div className="flex ">
                          <p className="ml-4  text-gray-600">M.R.P: </p>
                          <p className="ml-4 line-through text-gray-600">
                            ${item.product.price}
                          </p>
                        </div>
                        <p className="ml-4">${discountedPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-left text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        {/* <label htmlFor="quantity" className="block text-sm/6 font-medium text-gray-900">
                  Qty
                </label> */}
                        <label
                          htmlFor="quantity"
                          className="inline mr-2  text-sm/6 font-medium text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                          value={item.quantity}
                          onChange={(e) => handleQuantity(e, item)}
                          class="text-sm py-1  border rounded"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>

                      <div className="flex">
                        <Modal
                        className = "hidden"
                          title={`Delete  ${item.product.title}`}
                          message="Are you sure you want to delete this cart item"
                          dangerOption="Delete"
                          cancelOption="Cancel"
                          dangerAction={(e) => handleRemove(e, item.id)}
                          cancelAction={() => setOpenModal(null)}
                          showModal={openModal === item.id}
                        ></Modal>
                        <button
                          // problem: You are calling setOpenModal(item.id) i.e setOpenModal( item.id) immediately during render, instead of passing a function to onClick. This causes state to update on every render, which triggers another render, and so on.
                          onClick={() => setOpenModal(item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900 my-2">
            <p>Subtotal</p>
            <p>${parseFloat(totalAmount.toFixed(2))}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 my-2">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
