import { ADD_PRODUCTS } from "../actions/productsActions"


const initialState = []



export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_PRODUCTS:
            return action.payload
        default:
            return state
    }


}