export  function createUser (userData){
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/users", {   
            method: "POST",
            body: JSON.stringify(userData), 
            headers: {
                "Content-Type": "application/json",
            },
    })
    // TODO: on server it will return only relevant information of user9not password
        const data = await response.json()
        console.log(data)
        resolve({data})
    
    })
}


export  function checkUser (loginInfo){
    return new Promise(async (resolve, reject) => {
     const email= loginInfo.email;
     const password= loginInfo.password
    //  const response = await fetch("http://localhost:8080/users?email"+email)
     const response = await fetch(`http://localhost:8080/users?email=${email}`)
     const data = await response.json()
    //  console.log(data)
     if(data.length){
        // console.log(data[0].password)
        if(data[0].password === password){
        resolve({data: data[0]})
        }else{
        reject({message: "wrong credentials"})
        }
    }else{
        reject({message: "user not found"})
     }
    })
    // TODO: on server it will return only relevant information of user9not password
    
}