
import { ADD_SOLD_PRODUCTS } from "../actions/soldProductsActions"



const initialState = {}

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_SOLD_PRODUCTS:
            state = action.payload
            return state
        default:
            return state
    }


}