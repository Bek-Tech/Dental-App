import { ADD_PRODUCTS, DELETE_PRODUCT } from "../actions/productsActions"


const initialState = []



export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_PRODUCTS:
            state = action.payload
            return state
        case DELETE_PRODUCT:
            return state.filter(item => {
                return item.id !== action.id
            })
        default:
            return state
    }


}