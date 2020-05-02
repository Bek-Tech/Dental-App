import { combineReducers, createStore } from "redux"
import PurchasesReducer from "./PurchasesReducer"
import CustomersReducer from "./CustomersReducer"
import ProductsReducer from "./ProductsReducer"


const rootReducer = combineReducers({
    purchases: PurchasesReducer,
    customers: CustomersReducer,
    products: ProductsReducer
})
const store = createStore(rootReducer)

export default store