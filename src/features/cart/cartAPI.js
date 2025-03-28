export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export async function fetchItemsByUserId(userId) {
  try {
    const response = await fetch(`http://localhost:8080/cart?user=${userId}`);
    //response.ok is boolean value that indicates whether the response was successful (status in the range 200-299) or not. either true or false
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    //So, if response.ok is false (meaning the request was not successful), !response.ok will be true.
    const data = await response.json();
    // console.log(data)
    return { data };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function updateCart(update) {
  // console.log(update) // this also logs the item object
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH", // this is to modify the database of the item where as slice is to modify the state
      body: JSON.stringify(update), // this is the patch request with updated item object
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
export function deleteItemFromCart(itemId) {
  // console.log(update) // this also logs the item object
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE", // this is to modify the database of the item where as slice is to modify the state
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    resolve({ data: { id: itemId } });
  });
}
export async function resetCart(userId) {
  //get all the items of the user's cart and delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
