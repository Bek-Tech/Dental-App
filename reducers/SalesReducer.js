
import { ADD_SALES, ADD_NEW_SALE, DELETE_SALE } from "../actions/salesActions"



const initialState = []

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_SALES:
            state = action.payload
            return state
        case ADD_NEW_SALE:
            return [...state, action.payload]
        case DELETE_SALE:
            return state.filter(item => {
                return item.id !== action.id
            })

        default:
            return state
    }


}