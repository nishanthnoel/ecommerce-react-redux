export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // TODO: on server it will return only relevant information of user9not password
    const data = await response.json();
    console.log(data); // this logs the created user object with id
    resolve({ data });
  });
}

// export  function checkUser (loginInfo){
//     return new Promise(async (resolve, reject) => {
//         const email= loginInfo.email;
//         const password= loginInfo.password
//         //  const response = await fetch("http://localhost:8080/users?email"+email)
//         const response = await fetch(`http://localhost:8080/users?email=${email}`)
//         const data = await response.json()
//          console.log(data) //it returns an array with lenghth 1
//         if(data.length){
//             console.log(data[0])
//             if(data[0].password === password){
//                 resolve({data: data[0]})
//             }else{
//                 reject({message: "wrong credentials"})
//             }
//         }else{
//             reject({message: "user not found"})
//         }
//     })
//     // TODO: on server it will return only relevant information of user9not password

// }

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      }else{
        const error = await response.json()
        reject({error})
      }
      //   console.log(data);
    } catch (error) {
      reject({error});
    }
  });
  // TODO: on server it will return only relevant information of user9not password
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: "success" });
  });
}
