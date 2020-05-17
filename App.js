import React, { Component, } from 'react';
import { createAppContainer } from 'react-navigation'; // back and forward navigator
import { Provider, useDispatch } from 'react-redux'
import store from "./reducers/index"
import RootNavigation from './navigation'
import { initSales } from './DataBase/salesDB'
import { initCustomers, fetchCustomers } from './DataBase/customersDB'
import { initProducts } from './DataBase/productsDB'
import { addCustomers } from "./actions/customersActions"


initSales()
  .then(() => {
    console.log('Initialized salesDB');
  })
  .catch(err => {
    console.log('Initializing salesDB failed.');
    console.log(err);
  })

initCustomers()
  .then((result) => {
    console.log('Initialized CustomersDB');

  })
  .catch(err => {
    console.log('Initializing CustomersDB failed.');
    console.log(err);
  })

initProducts()
  .then(() => {
    console.log('Initialized  productsDB');
  })
  .catch(err => {
    console.log('Initializing productsDB failed.');
    console.log(err);
  })





const Screens = createAppContainer(RootNavigation);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Screens />
      </Provider>
    );
  }
}



// styles  _________________________________________________________
