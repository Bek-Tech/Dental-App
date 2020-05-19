import { ADD_PRODUCTS } from "../actions/productsActions"


const initialState = []



export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_PRODUCTS:
            state = action.payload
            return state
        default:
            return state
    }


}