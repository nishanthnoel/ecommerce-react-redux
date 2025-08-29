export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    // setTimeout(()=> resolve({data: amount}), 500)
    const response = await fetch(
      // "/orders/?user.id=" + userId  //cahnged due to backend controller logic
      // "/orders/?user=" + userId // query params
      "/orders/own/", // query params
      { credentials: "include" }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve, reject) => {
    // setTimeout(()=> resolve({data: amount}), 500)
    const response = await fetch("/users/own", {
      credentials: "include",
    }); //Path Parameter // we have changed the api link  to own for loggedInUser fetching
    const data = await response.json();
    resolve({ data });
  });
}
export function updateUser(update) {
  // console.log(update)  //this logs object
  return new Promise(async (resolve) => {
    const response = await fetch("/users/" + update.id, {
      // users / was missing hencethe data wasnt getting updated to the database
      method: "PATCH",
      body: JSON.stringify(update),
      credentials: "include" ,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data)
    resolve({ data });
  });
}
