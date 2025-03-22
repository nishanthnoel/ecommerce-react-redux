// src/features/counter/Counter.js
import { useDispatch, useSelector } from "react-redux";
// import { selectLoggedInUser } from "../../auth/authSlice";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

function UserProfile() {
  const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser);
  const user = useSelector(selectUserInfo);
  const [selectEditIndex, setSelectEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  // selectUserInfo and selectLoggedInUser = {name: "Guest", email: "email@gmail,com", addresses: []}
// TODO : we will add payment section when we work on backend

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate); //removes the address at index
    dispatch(updateUserAsync(newUser));
    setSelectEditIndex(-1);
  };


  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1); //removes the address at index
    dispatch(updateUserAsync(newUser));
  };

  const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses,address] }; // for shallow copy issue
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  const handleEditForm = (index) => {
    setSelectEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="mx-auto mt-20 bg-gray-200 max-w-7xl px-4 sm:px-6 lg:px-8 rounded-md border border-transparent">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight my-2 text-gray-900">
            Name: {user.name ? user.name : "Guest"}
          </h1>
          <h3 className="text-xl font-bold tracking-tight my-2 text-red-900">
            Email Addresses: {user.email}
          </h3>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
          onClick={e=>{setShowAddAddressForm(true); setSelectEditIndex(-1)}}
            type="submit"
            className="mb-10 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Address
          </button>
          {showAddAddressForm ? (
            <form
              className=" bg-white px-5 mt-12 py-10"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data); // we get object of the input data

                handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          // name="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Phone number is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register("street", {
                            required: "Street is required",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register("city", {
                            required: "City is required",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          {...register("state", {
                            required: "State is required",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinCode"
                          {...register("pinCode", {
                            required: "Pin Code is required",
                          })}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* cancel and save button */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                  {/* <ul role="list">
                        {user.addresses.map((address, index) => (
                          <li
                            key={index}
                            className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-200"
                          >
                            <div className="flex min-w-0 gap-x-4">
                              <input
                                // onChange={handleAddress}
                                value={index}
                                type="radio"
                                name="address"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">
                                  {address.street}
                                </p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">
                                  {address.city}, {address.state}
                                </p>
                              </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm/6 text-gray-900">
                                Phone: {address.phone}
                              </p>
                              <p className="text-sm/6 text-gray-500">
                                {address.email}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul> */}

                  {/* <div className="mt-10 space-y-10">
                        <fieldset>
                          <legend className="text-sm/6 font-semibold text-gray-900">
                            Payment Methods
                          </legend>
                          <p className="mt-1 text-sm/6 text-gray-600">
                            Choose one
                          </p>
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                              <input
                                // onChange={handlePayment}
                                id="cash"
                                value="cash"
                                name="payments"
                                // checked={paymentMethod === "cash"}
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                              />
                              <label
                                htmlFor="cash"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Cash
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="card"
                                // onChange={handlePayment}
                                value="card"
                                name="payments"
                                // checked={paymentMethod === "card"}
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                              />
                              <label
                                htmlFor="card"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Card Payment
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div> */}
                </div>
              </div>
            </form>
          ) : null}
          <p className="flex-initial mt-0.5 text-md text-black font-bold text-left">
            Your Addresses :
          </p>
          {user.addresses.map((address, index) => (
            <div>
              {selectEditIndex === index ? (
                <form
                  className=" bg-white px-5 mt-12 py-10"
                  noValidate
                  onSubmit={handleSubmit((data, index) => {
                    console.log(data); // we get object of the input data
                    // dispatch(
                    //   updateUserAsync({
                    //     ...user,
                    //     addresses: [...user.addresses, data],
                    //   })
                    // );
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm/6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              id="name"
                              // name="name"
                              {...register("name", {
                                required: "Name is required",
                              })}
                              type="text"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "Email is required",
                              })}
                              type="email"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2 grid grid-cols-1">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "Phone number is required",
                              })}
                              type="tel"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              id="street"
                              {...register("street", {
                                required: "Street is required",
                              })}
                              type="text"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              id="city"
                              {...register("city", {
                                required: "City is required",
                              })}
                              type="text"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="state"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              id="state"
                              {...register("state", {
                                required: "State is required",
                              })}
                              type="text"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              id="pinCode"
                              {...register("pinCode", {
                                required: "Pin Code is required",
                              })}
                              type="text"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  border-gray-400 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* cancel and save button */}
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setSelectEditIndex(-1)}
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                      {/* <ul role="list">
                        {user.addresses.map((address, index) => (
                          <li
                            key={index}
                            className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-200"
                          >
                            <div className="flex min-w-0 gap-x-4">
                              <input
                                // onChange={handleAddress}
                                value={index}
                                type="radio"
                                name="address"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">
                                  {address.street}
                                </p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">
                                  {address.city}, {address.state}
                                </p>
                              </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm/6 text-gray-900">
                                Phone: {address.phone}
                              </p>
                              <p className="text-sm/6 text-gray-500">
                                {address.email}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul> */}

                      {/* <div className="mt-10 space-y-10">
                        <fieldset>
                          <legend className="text-sm/6 font-semibold text-gray-900">
                            Payment Methods
                          </legend>
                          <p className="mt-1 text-sm/6 text-gray-600">
                            Choose one
                          </p>
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                              <input
                                // onChange={handlePayment}
                                id="cash"
                                value="cash"
                                name="payments"
                                // checked={paymentMethod === "cash"}
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                              />
                              <label
                                htmlFor="cash"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Cash
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="card"
                                // onChange={handlePayment}
                                value="card"
                                name="payments"
                                // checked={paymentMethod === "card"}
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                              />
                              <label
                                htmlFor="card"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Card Payment
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div> */}
                    </div>
                  </div>
                </form>
              ) : null}
              <div className="px-5 gap-x-6 py-5 my-2 border border-white rounded-md shadow-sm flex items-center justify-between">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold text-gray-900 text-left">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500 text-left">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500 text-left">
                      {address.city}, {address.state} - {address.pinCode}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm text-gray-900 text-right">
                    Phone: {address.phone}
                  </p>
                  <p className="text-sm text-gray-500 text-right">
                    {address.city}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={(e) => handleEditForm(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
//
export default UserProfile;
