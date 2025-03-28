// src/features/counter/Counter.js
import { useDispatch, useSelector } from "react-redux";
import { increment, incrementAsync, selectOrder } from "./orderSlice";

function Order() {
  const count = useSelector(selectOrder); // Access the counter value from the Redux store
  const dispatch = useDispatch();

  return (
    <div>
      <div></div>
    </div>
  );
}
// 
export default Order;
