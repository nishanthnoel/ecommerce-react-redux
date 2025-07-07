export  function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    // setTimeout(()=> resolve({data: amount}), 500)
    const response = await fetch(
      // "http://localhost:8080/orders/?user.id=" + userId  //cahnged due to backend controller logic
      "http://localhost:8080/orders/?user=" + userId  // query params
    );
    const data = await response.json();
    resolve({ data });
  });
}

export  function fetchLoggedInUser (userId){
    return new Promise(async (resolve, reject) => {
        // setTimeout(()=> resolve({data: amount}), 500)
        const response = await fetch("http://localhost:8080/users/"+userId) //Path Parameter
        const data = await response.json()
        resolve({data})
       

    })
}
export  function updateUser (update){
    // console.log(update)  //this logs object
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/users/"+update.id, {    // users / was missing hencethe data wasnt getting updated to the database 
            method: "PATCH",
            body: JSON.stringify(update), 
            headers: {
                "Content-Type": "application/json",
            },
    })
        const data = await response.json()
        // console.log(data)  
        resolve({data}) 
    
    })
}