// all products are fetched using query
// export async function fetchAllProducts() {
//   //TODO: server will filter the deleted products

//   try {
//     const response = await fetch("http://localhost:8080/products");

//     // Check if the response is OK (status code 2xx)
//     if (!response.ok) {
//       throw new Error("Failed to fetch products");
//     }

//     const data = await response.json();
//     // console.log({ data });
//     return { data }; // Returning the data as an object
//   } catch (error) {
//     // Handle errors (e.g., network errors, or bad response)
//     console.error(error);
//     throw error; // Rethrow the error to propagate it
//   }
// }

// export async function fetchProductById({id}) {
//   return new Promise(async (resolve, reject) => {
//     const response = fetch(`http://localhost:8080/products/${id}`);
//     const data = await response.json();
//     resolve({ data });
//   });
// }

export async function fetchProductById(id) {
  // console.log(id);
  try {
    const response = await fetch(`http://localhost:8080/products/${id}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    // console.log(data);
    return { data };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchBrands() {
  try {
    const response = await fetch("http://localhost:8080/brands", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch Brands");
    }
    const data = await response.json();
    // console.log({ data });
    return { data };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function createProduct(product) {
  try {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    const data = await response.json();
    // console.log({ data });
    return { data };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// export  function createProduct (product){
//   return new Promise(async (resolve) => {
//       const response = await fetch("http://localhost:8080/users", {
//           method: "POST",
//           body: JSON.stringify(product),
//           headers: {
//               "Content-Type": "application/json",
//           },
//   })
//   // TODO: on server it will return only relevant information of user9not password
//       const data = await response.json()
//       console.log(data)  // this logs the created user object with id
//       resolve({data})

//   })
// }

export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:8080/categories", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Categories");
    }

    const data = await response.json();
    // console.log({ data });
    return { data };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH", // this is to modify the database of the item where as slice is to modify the state
        body: JSON.stringify(update), // this is the patch request with updated item object
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

export async function fetchProductsByFilters(filter, sort, pagination, admin) {
  // console.log(filter);

  //filter = {category: "electronics"}
  //sort = {_sort: "-rating""}
  //pagination = {page:1, limit:17} _page=1&_limit=17
  //TODO: on server we will use multiple values  filter = {category: ["electronics", "laptops"]} here the filter will be an array and we have to push the values in the query string as category=electronics&category=laptops
  // let queryString = "";
  // for (let key in filter) {
  //   // console.log(filter[key]) //filter[key]=filter[category]=furniture
  //   // console.log(key) //category
  //   queryString += `${key}=${filter[key]}&`; // & is used to separate the query parameters if there are more than one
  // }
  // console.log(queryString) //category=furniture&

  //or we can use the below code to handle multiple values
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    console.log(categoryValues); //furniture
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      // console.log(lastCategoryValue);
      queryString += `${key}=${lastCategoryValue}&`;
      // console.log(queryString);
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`; // this logic will work in older versions of json-ser
  }
  if (admin) {
    queryString += `admin=true`;
  }
  // console.log(queryString);
  try {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString, //http://localhost:8080/products?category=laptops&_sort=-rating
      { credentials: "include" }
    );
    // console.log(response);

    // Check if the response is OK (status code 2xx)
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    // console.log(response.json());// the reciieved arry is the same first 10 products
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    // console.log({ data });
    return { data: { products: data, totalItems: +totalItems } }; // Returning the data as an object
  } catch (error) {
    // Handle errors (e.g., network errors, or bad response)
    console.error(error);
    throw error; // Rethrow the error to propagate it
  }
}
