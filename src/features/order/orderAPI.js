export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders", {
      method: "POST",
      body: JSON.stringify(order),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data)
    resolve({ data });
  });
}
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data)
    resolve({ data });
  });
}
export async function fetchAllOrders({ sort, pagination }) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`; // this logic will work in older versions of json-ser
  }
  // console.log(queryString);

  try {
    const response = await fetch(
      "/orders?" + queryString, ///orders?page=1&_limit=10
      { credentials: "include" }
    );
    // console.log(response);

    // Check if the response is OK (status code 2xx)
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    // console.log(response.json());// the reciieved arry is the same first 10 products
    const data = await response.json();
    const totalOrders = response.headers.get("X-Total-Count");
    // console.log({ data });
    return { data: { orders: data, totalOrders: +totalOrders } }; // Returning the data as an object
  } catch (error) {
    // Handle errors (e.g., network errors, or bad response)
    console.error(error);
    throw error; // Rethrow the error to propagate it
  }
}
