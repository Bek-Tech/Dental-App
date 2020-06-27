import { insertSale, deleteSale, fetchSales, updateSale } from '../DataBase/salesDB'
import { fetchProducts } from '../DataBase/productsDB'


export const ADD_SALES = 'ADD_SALES'
export const ADD_NEW_SALE = 'ADD_NEW_SALE'
export const DELETE_SALE = 'DELETE_SALE'
export const ADD_SOLD_PRODUCTS = "ADD_SOLD_PRODUCTS"


export const addSoldProducts = (sales) => {
    return async dispatch => {
        try {
            const productsResult = await fetchProducts()
            const products = productsResult.rows._array

            const dataObj = {}
            for (let i = 0; i < products.length; i++) {
                const id = products[i].id
                dataObj[id] = {}
                dataObj[id].soldArr = []
                dataObj[id].totalSold = 0
            }
            for (let j = 0; j < sales.length; j++) {
                const productsArr = JSON.parse(sales[j].productsArr)
                productsArr.forEach(item => {
                    if (dataObj[item.id]) {
                        dataObj[item.id].soldArr.push(item)
                        dataObj[item.id].totalSold = dataObj[item.id].totalSold + item.quantity
                    } else {
                        return null
                    }

                })
            }


            dispatch({ type: ADD_SOLD_PRODUCTS, payload: dataObj })
        } catch (err) {
            throw err;
        }
    }
}


export const addSales = () => {

    return async dispatch => {
        try {
            const fetchedResult = await fetchSales()
            const data = fetchedResult.rows._array
            dispatch(addSoldProducts(data))
            if (data.length > 0) {
                const result = await data.map(item => {
                    const parsedProducts = JSON.parse(item.productsArr)
                    return { ...item, productsArr: parsedProducts }
                })
                dispatch({ type: ADD_SALES, payload: result })
            } else {
                dispatch({ type: ADD_SALES, payload: data })
            }

        } catch (err) {
            throw err
        }

    }





}

export const addNewSale = (day, month, year, customerId, customerName, productsArr) => {
    return async dispatch => {
        try {
            const stringArr = JSON.stringify(productsArr)
            await insertSale(day, month, year, customerId, customerName, stringArr)
            // console.log(" inserted")
            // const saleObj = { day, month, year, customerId, customerName, productsArr }
            dispatch(addSales())

        } catch (err) {
            throw err
        }
    }
}

export const deleteSaleAction = (id) => {
    return async dispatch => {
        try {
            await deleteSale(id)
            dispatch(addSales())
        } catch (err) {
            throw err
        }

    }
}


export const editSale = (id, day, month, year, customerId, customerName, productsArr) => {
    return async dispatch => {
        try {
            const stringArr = JSON.stringify(productsArr)
            await updateSale(id, day, month, year, customerId, customerName, stringArr)
            dispatch(addSales())
        } catch (err) {
            throw err
        }

    }
}