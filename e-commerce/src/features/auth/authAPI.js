export default function fetchCount (amount = 1){
    return new Promise(async (resolve) => {
        // setTimeout(()=> resolve({data: amount}), 500)
        const response = await fetch("http://localhost:8080")
        const data = await response.json()
        resolve({data})
    
    })
}