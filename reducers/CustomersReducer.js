import { ADD_CUSTOMERS, DELETE_CUSTOMER } from "../actions/customersActions"


const initialState = []



export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_CUSTOMERS:
            state = action.payload
            return state
        case DELETE_CUSTOMER:
            return state.filter(item => {
                return item.id !== action.id
            })
        default:
            return state
    }


}