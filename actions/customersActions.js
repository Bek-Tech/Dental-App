export const ADD_CUSTOMERS = 'ADD_CUSTOMERS'



export const addCustomers = data => {
    return { type: ADD_CUSTOMERS, payload: data }
}