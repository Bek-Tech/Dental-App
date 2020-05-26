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
            console.log(salesResult)
            for (let i = 0; i < products.length; i++) {
                const id = products[i].id
                dataObj[id] = []
            }
            for (let j = 0; j < sales.length; j++) {
                const productsArr = JSON.parse(sales[j].productsArr)
                for (let k = 0; k < productsArr.length; k++) {
                    const id = productsArr[k].id
                    dataObj[id] ? dataObj[id].push(productsArr[k]) : null
                }
            }
            console.log("action")
            console.log(dataObj)

            dispatch({ type: ADD_SOLD_PRODUCTS, payload: dataObj })
        } catch (err) {
            throw err;
        }
    }
}