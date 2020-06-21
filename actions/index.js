import { addCustomers } from './customersActions'
import { addProducts } from './productsActions'
import { addSales } from './salesActions'




export const reFetchSales = () => {
    return async dispatch => {
        try {
            await dispatch(addSales())
            dispatch(addSoldProducts())
        } catch (err) {
            throw err
        }
    }
}

export const reFetchCustomers = () => {
    return async dispatch => {
        try {
            await dispatch(addCustomers())
            // dispatch(addSoldProducts())
        } catch (err) {
            throw err
        }
    }
}

export const reFetchProducts = () => {
    return async dispatch => {
        try {
            await dispatch(addProducts())
            dispatch(addSales())
        } catch (err) {
            throw err
        }
    }
}