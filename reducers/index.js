import { combineReducers, createStore } from "redux"
import SalesReducer from "./SalesReducer"
import CustomersReducer from "./CustomersReducer"
import ProductsReducer from "./ProductsReducer"


const rootReducer = combineReducers({
    salesHistory: SalesReducer,
    customers: CustomersReducer,
    products: ProductsReducer
})
const store = createStore(rootReducer)

export default store