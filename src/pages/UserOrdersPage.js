import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/userOrders";

function UserOrdersPage() {
  return (
    <>
      <Navbar>
      <h1 className="text-2xl font-bold tracking-tight text-black text-left">My Orders</h1>
        <UserOrders></UserOrders>
      </Navbar>
    </>
  );
}

export default UserOrdersPage;
