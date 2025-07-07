// src/features/counter/Counter.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";
import { discountedPrice } from "../../../app/constants";
// import { selectLoggedInUser } from "../../auth/authSlice";

function UserOrders() {
  const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(userInfo.id));
  }, []);

  return (
    <>
      
        <div>
          {orders.map((order) => (
            <div>
              <div>
                {/* {!items.length && <Navigate to="/" replace={true}></Navigate>} */}

                <div className="mx-auto mt-20 bg-gray-200 max-w-7xl px-4 sm:px-6 lg:px-8 rounded-md border border-transparent">
                  {/* <h2 className="text-3xl font-bold">Cart</h2> */}

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <h1 className="text-4xl font-bold tracking-tight my-2 text-gray-900">
                      Order # {order.id}
                    </h1>
                    <h3 className="text-xl font-bold tracking-tight my-2 text-red-900">
                      Order Status: {order.status}
                    </h3>
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {order.items.map((item) => (
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
                                  <div className="flex">

                                  <p className="ml-4">M.R.P:</p>
                                  <p className="ml-4 line-through">${item.product.price}</p>
                                  </div>
                                  <p className="ml-4 font-bold">${discountedPrice(item.product)}</p>
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
                                    Qty :{item.quantity}
                                  </label>
                                </div>

                                <div className="flex"></div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                      <p>Subtotal :</p>
                      <p className="font-bold">${parseFloat(order.totalAmount.toFixed(2))}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                      <p>Total Items in Cart :</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    {/* flex justify-between */}

                    <p className="flex-initial mt-0.5 text-md text-gray-500 text-left">
                      Shipping Address :
                    </p>
                    <div className="px-5 gap-x-6 py-5 my-2 border border-white rounded-md shadow-sm flex items-center justify-between">
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold text-gray-900 text-left">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-500 text-left">
                            {order.selectedAddress.street}
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-500 text-left">
                            {order.selectedAddress.city},{" "}
                            {order.selectedAddress.state}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm text-gray-900 text-right">
                          Phone: {order.selectedAddress.phone}
                        </p>
                        <p className="text-sm text-gray-500 text-right">
                          {order.selectedAddress.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      
    </>
  );
}
//
export default UserOrders;
