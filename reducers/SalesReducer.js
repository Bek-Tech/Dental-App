import { initSales, fetchSales } from '../DataBase/salesDB'

import { ADD_SALES, ADD_NEW_SALE } from "../actions/salesActions"




// const fetchSalesToState = async () => {
//     const result = await fetchSales()

//     const parsedSales = await result.rows._array.map(item => {
//         const parsedProducts = JSON.parse(item.products)
//         return { ...item, products: parsedProducts }
//     })
//     return parsedSales
// }

const initialState = []

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_SALES:
            state = action.payload
            return state
        case ADD_NEW_SALE:

            console.log("reducer")
            return [...state, action.payload]

        default:
            return state
    }


}