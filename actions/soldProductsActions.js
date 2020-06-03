import { fetchProducts } from '../DataBase/productsDB'
import { fetchSales } from '../DataBase/salesDB'


export const ADD_SOLD_PRODUCTS = "ADD_SOLD_PRODUCTS"

export const addSoldProducts = () => {
    return async dispatch => {
        try {
            const productsResult = await fetchProducts()
            const salesResult = await fetchSales()

            const products = productsResult.rows._array
            const sales = salesResult.rows._array
            const dataObj = {}

            for (let i = 0; i < products.length; i++) {
                const name = products[i].name
                // const parsedHistory = JSON.parse(products[i].history)
                dataObj[name] = {}
                dataObj[name].soldArr = []
                dataObj[name].totalSold = 0
                // console.log(1)
            }
            for (let j = 0; j < sales.length; j++) {
                const productsArr = JSON.parse(sales[j].productsArr)

                for (let k = 0; k < productsArr.length; k++) {
                    const name = productsArr[k].name
                    const quantity = productsArr[k].quantity
                    if (dataObj[name]) {
                        dataObj[name].soldArr.push(productsArr[k])
                        dataObj[name].totalSold = dataObj[name].totalSold + quantity

                    } else {
                        return null
                    }


                }
            }


            dispatch({ type: ADD_SOLD_PRODUCTS, payload: dataObj })
        } catch (err) {
            throw err;
        }
    }
}


// export const addSoldProducts = () => {
//     return async dispatch => {
//         try {
//             const productsResult = await fetchProducts()
//             const salesResult = await fetchSales()
//             const products = productsResult.rows._array
//             const sales = salesResult.rows._array
//             const dataObj = {}
//             console.log(salesResult)
//             for (let i = 0; i < products.length; i++) {
//                 const id = products[i].id
//                 dataObj[id] = []
//             }
//             for (let j = 0; j < sales.length; j++) {
//                 const productsArr = JSON.parse(sales[j].productsArr)
//                 for (let k = 0; k < productsArr.length; k++) {
//                     const id = productsArr[k].id
//                     dataObj[id] ? dataObj[id].push(productsArr[k]) : null
//                 }
//             }
//             console.log("action")
//             console.log(dataObj)

//             dispatch({ type: ADD_SOLD_PRODUCTS, payload: dataObj })
//         } catch (err) {
//             throw err;
//         }
//     }
// }