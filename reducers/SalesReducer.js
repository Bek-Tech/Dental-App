import { ADD_SALES } from "../actions/salesActions"


const initialState = []



export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_SALES:
            return action.payload
        default:
            return state
    }


}