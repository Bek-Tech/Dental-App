import { insertProduct, deleteProduct, fetchProducts, updateProduct } from '../DataBase/productsDB'
//insertProduct(date, name, stock, history)
export const ADD_PRODUCTS = 'ADD_PRODUCTS'
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCTS'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const EDIT_PRODUCT = "EDIT_PRODUCT"

export const addProducts = () => {
    return async dispatch => {
        try {
            const result = await fetchProducts()
            dispatch({ type: ADD_PRODUCTS, payload: result.rows._array })
        } catch (err) {
            throw err;
        }
    };





}

export const addNewProduct = (date, name, stock) => {
    return async dispatch => {
        try {
            await insertProduct(date, name, stock)
            dispatch(addProducts())
        } catch (err) {
            throw err
        }

    }



}

export const deleteProductAction = (id) => {
    return async dispatch => {
        try {
            await deleteProduct(id)
            dispatch(addProducts())
        } catch (err) {
            throw err
        }

    }
}

export const editProduct = (id, date, name, stock) => {
    return async dispatch => {
        try {
            await updateProduct(id, date, name, stock)
            dispatch(addProducts())
        } catch (err) {
            throw err
        }

    }
}