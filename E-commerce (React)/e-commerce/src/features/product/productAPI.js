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

export async function fetchProductsByFilters(filter) {
  //filter = {category: "electronics"}
  //TODO: on server we will use multiple values
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`; // & is used to separate the query parameters if there are more than one
  }
  try {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );

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
