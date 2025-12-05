export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data); // this logs the created user object with id
    resolve({ data });
  });
}

// export  function checkUser (loginInfo){
//     return new Promise(async (resolve, reject) => {
//         const email= loginInfo.email;
//         const password= loginInfo.password
//         //  const response = await fetch("/users?email"+email)
//         const response = await fetch(`/users?email=${email}`)
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

// }

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Try to parse JSON body safely. Some backends may send empty or non-JSON bodies.
      let data = null;
      try {
        data = await response.json();
      } catch (parseErr) {
        // If parsing fails, try to read as text and wrap it
        try {
          const text = await response.text();
          if (text) {
            // try to interpret text as JSON-ish
            try {
              data = JSON.parse(text);
            } catch (_) {
              data = { message: text };
            }
          } else {
            data = null;
          }
        } catch (tErr) {
          data = null;
        }
      }

      if (response.ok) {
        // Resolve with parsed body (or null) so thunk can set user accordingly
        resolve({ data });
      } else {
        // If body has an error field, prefer it. Otherwise fall back to statusText.
        const errMsg =
          (data && (data.error || data.message)) ||
          response.statusText ||
          "Login failed";
        // reject with a serializable object
        reject({ error: errMsg });
      }
      //   console.log(data);
    } catch (error) {
      // Network/parse level errors
      reject({ error: error.message || "Network error" }); // string only
    }
  });
}

export function checkAuth() {
  console.log("checkAuth called");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check", {
        credentials: "include",
      });
      if (response.ok) {
        resolve({ data: "Success" });
      } else {
        const error = await response.text();
        reject({ error });
      }
      //   console.log(data);
    } catch (error) {
      reject({ error });
    }
  });
}

export function signOut() {
  console.log("signOut called");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/logout", {
        credentials: "include",
      });
      if (response.ok) {
        resolve({ data: "Success" });
      } else {
        const error = await response.text();
        reject({ error });
      }
      //   console.log(data);
    } catch (error) {
      reject({ error });
    }
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("reset password Request called");
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        body: JSON.stringify(email),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject({ error });
      }
      //   console.log(data);
    } catch (error) {
      reject({ error });
    }
  });
}
export function resetPassword(data) {
  console.log("reset password Request called");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject({ error });
      }
      //   console.log(data);
    } catch (error) {
      reject({ error });
    }
  });
}
