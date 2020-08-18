import { insertProduct, deleteProduct, fetchProducts, updateProduct, updateProductStatus, totallyDeleteProduct } from '../DataBase/productsDB'

import { reFetchProducts } from "./index"


export const ADD_PRODUCTS = 'ADD_PRODUCTS'
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCTS'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const EDIT_PRODUCT = "EDIT_PRODUCT"

export const addProducts = () => {
    return async dispatch => {
        try {
            const productsResult = await fetchProducts()
            const products = productsResult.rows._array


            if (products.length > 0) {
                const result = products.map(item => {
                    const parsedHistory = JSON.parse(item.history)
                    const totalReceived = parsedHistory.length > 0 ? item.stock + parsedHistory.reduce((acc, item) => {
                        return item.quantity + acc
                    }, 0) : item.stock

                    return { ...item, history: parsedHistory, totalReceived: totalReceived }
                })

                dispatch({ type: ADD_PRODUCTS, payload: result })
            } else {
                dispatch({ type: ADD_PRODUCTS, payload: products })
            }

        } catch (err) {
            throw err;
        }
    };


}



export const addNewProduct = (date, name, stock, history, color) => {
    return async dispatch => {
        try {
            await insertProduct(date, name, stock, history, color)
            dispatch(addProducts())
        } catch (err) {
            throw err
        }

    }

}

export const restoreProduct = (id) => {
    return dispatch => {
        try {
            updateProductStatus(id, "active")
            dispatch(reFetchProducts())
        } catch (err) {
            throw err
        }

    }

}

export const deleteProductAction = (id) => {
    return async dispatch => {
        try {
            await deleteProduct(id)
            dispatch(reFetchProducts())
        } catch (err) {
            throw err
        }

    }
}

export const editProduct = (id, date, name, stock, history, color) => {
    return async dispatch => {
        try {
            await updateProduct(id, date, name, stock, history, color)
            dispatch(reFetchProducts())
        } catch (err) {
            throw err
        }

    }
}


export const totallyDeleteProductAction = (id) => {
    return () => {
        try {
            totallyDeleteProduct(id)
        } catch (err) {
            throw err
        }

    }
}