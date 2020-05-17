import { ADD_CUSTOMERS } from "../actions/customersActions"


const initialState = []



export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_CUSTOMERS:
            return action.payload
        default:
            return state
    }


}