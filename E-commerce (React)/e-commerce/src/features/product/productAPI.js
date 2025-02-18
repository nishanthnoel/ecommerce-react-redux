export async function fetchAllProducts() {
  try {
    const response = await fetch("http://localhost:8080/products");

    // Check if the response is OK (status code 2xx)
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    console.log({ data });
    return { data }; // Returning the data as an object
  } catch (error) {
    // Handle errors (e.g., network errors, or bad response)
    console.error(error);
    throw error; // Rethrow the error to propagate it
  }
}

export async function fetchProductsByFilters(filter, sort, pagination) {
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
      console.log(lastCategoryValue);
      queryString += `${key}=${lastCategoryValue}&`;
      console.log(queryString);
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`; // this logic will work in older versions of json-ser
  }
  // console.log(queryString);
  try {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString //http://localhost:8080/products?category=laptops&_sort=-rating
    );
    console.log(response);

    // Check if the response is OK (status code 2xx)
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    // console.log(response.json());// the reciieved arry is the same first 10 products
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    // console.log({ data });
    return { data: {products: data,totalItems: +totalItems}}; // Returning the data as an object
  } catch (error) {
    // Handle errors (e.g., network errors, or bad response)
    console.error(error);
    throw error; // Rethrow the error to propagate it
  }
}
