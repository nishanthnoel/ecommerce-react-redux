export async function fetchAllProducts() {
    try {
      const response = await fetch("http://localhost:8080/products");
  
      // Check if the response is OK (status code 2xx)
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
  
      const data = await response.json();
      console.log({data})
      return { data }; // Returning the data as an object
    } catch (error) {
      // Handle errors (e.g., network errors, or bad response)
      console.error(error);
      throw error; // Rethrow the error to propagate it
    }
  }
  