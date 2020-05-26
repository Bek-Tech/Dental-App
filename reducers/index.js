import { combineReducers, createStore, applyMiddleware } from "redux"
import SalesReducer from "./SalesReducer"
import CustomersReducer from "./CustomersReducer"
import ProductsReducer from "./ProductsReducer"
import SoldProductsReducer from "./SoldProductsReducer"
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
    salesHistory: SalesReducer,
    customers: CustomersReducer,
    products: ProductsReducer,
    soldProducts: SoldProductsReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default store