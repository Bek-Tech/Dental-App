
import { ADD_SALES, ADD_NEW_SALE, DELETE_SALE, ADD_SOLD_PRODUCTS } from "../actions/salesActions"



const initialState = {
    sales: [],
    productsSale: {}
}

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_SALES:
            state = { ...state, sales: action.payload }
            return state
        case ADD_NEW_SALE:
            return [...state, action.payload]
        case ADD_SOLD_PRODUCTS:
            state = { ...state, productsSale: action.payload }
            return state

        default:
            return state
    }


}