import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useEffect, useState } from "react";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constants";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  const handlePage = (page) => {
    setPage(page);
    // the below code is removed anf put in useEffect while sorting
    // const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    // dispatch(fetchAllOrdersAsync(pagination)); // Dispatch the action with the updated page
  };

  const handleEdit = (e, order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = () => {};

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort); // dispatch(fetchAllOrdersAsync({ sort, pagination }));
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  const handlePaymentStatus = (e, order) => {
    const updatedOrder = { ...order, PaymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  useEffect(() => {
    // sort = {

    // }
    // since the handle page is done using a handler no need of setting handle function. therefore we call handlePage()
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
    handlePage(page);
  }, [dispatch, page, sort]); // keeping a function as dependency makes infinite calls

  return (
    <>
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order #
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline ml-2"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline ml-2"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount{" "}
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline ml-2"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline ml-2"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Order Status</th>
                    {/* this was status */}
                    <th className="py-3 px-6 text-center">Payment Method</th>
                    <th className="py-3 px-6 text-center">Payment Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <div className="mr-2">
                    
                        </div> */}
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                                alt={item.product.title}
                              />
                            </div>
                            <span>
                              {item.product.title} - <b>Q:</b> {item.quantity} -{" "}
                              <b>$:</b> {discountedPrice(item.product)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {" "}
                          <span className="bg-purple-200 py-1 px-3 rounded-full text-xs">
                            ${order.totalAmount}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className="bg-purple-200py-1 px-3 rounded-full text-xs">
                          <strong>{order.selectedAddress.name},</strong>
                          <div>email: {order.selectedAddress.email},</div>
                          <div>ph: {order.selectedAddress.phone},</div>
                          <div>
                            {order.selectedAddress.street},{" "}
                            {order.selectedAddress.city},
                          </div>

                          <div>
                            {order.selectedAddress.state} -{" "}
                            {order.selectedAddress.pinCode},
                          </div>
                        </span>
                      </td>
                      {/* <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {" "}
                          <span className="bg-purple-200 py-1 px-3 rounded-full text-xs">
                            ${order.paymentMethod}
                          </span>
                        </div>
                      </td> */}
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleOrderStatus(e, order)}>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs `}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      {/* paymet method */}
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {" "}
                          <span className="bg-purple-200 py-1 px-3 rounded-full text-xs">
                            ${order.paymentMethod}
                          </span>
                        </div>
                      </td>
                      {/* this is payment status */}
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            onChange={(e) => handlePaymentStatus(e, order)}
                          >
                            <option value="pending">Pending</option>
                            <option value="received">Received</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.PaymentStatus
                            )} py-1 px-3 rounded-full text-xs `}
                          >
                            {order.PaymentStatus}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-120">
                            <EyeIcon
                              onClick={(e) => handleShow(e, order)}
                            ></EyeIcon>
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-120">
                            <PencilIcon
                              onClick={(e) => handleEdit(e, order)}
                            ></PencilIcon>
                          </div>
                          {/* <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div> */}
                          {/* <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </>
  );
}

export default AdminOrders;
