import { insertSale, deleteSale, fetchSales } from '../DataBase/salesDB'


export const ADD_SALES = 'ADD_SALES'
export const ADD_NEW_SALE = 'ADD_NEW_SALE'
export const DELETE_SALE = 'DELETE_SALE'

export const addSales = () => {

    return async dispatch => {
        try {
            const fetchedResult = await fetchSales()
            const data = fetchedResult.rows._array
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
            dispatch({ type: DELETE_SALE, id })
        } catch (err) {
            throw err
        }

    }
}