import { fetchCustomers, deleteCustomer, insertCustomer, updateCustomer } from '../DataBase/customersDB'
//insertCustomer (date, name, phone)
import { reFetchCustomers } from "./index"
export const ADD_CUSTOMERS = 'ADD_CUSTOMERS'
export const ADD_NEW_CUSTOMER = 'ADD_NEW_CUSTOMER'
export const DELETE_CUSTOMER = "DELETE_CUSTOMER"


export const addCustomers = () => {
    return async dispatch => {
        try {
            const result = await fetchCustomers()
            dispatch({ type: ADD_CUSTOMERS, payload: result.rows._array });
        } catch (err) {
            throw err;
        }
    };
}


export const addNewCustomer = (date, name, phone) => {

    return async dispatch => {
        try {
            await insertCustomer(date, name, phone)
            dispatch(addCustomers())
        } catch (err) {
            throw err
        }

    }
}



export const deleteCustomerAction = id => {

    return async dispatch => {
        try {
            await deleteCustomer(id)
            dispatch({ type: DELETE_CUSTOMER, id })
        } catch (err) {
            throw err
        }

    }
}

export const editCustomer = (id, date, name, phone) => {
    return async dispatch => {
        try {
            await updateCustomer(id, date, name, phone)
            dispatch(reFetchCustomers())
        } catch (err) {
            throw err
        }

    }
}