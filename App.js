import React, { Component, } from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider, useDispatch } from 'react-redux'
import store from "./reducers/index"
import RootNavigation from './navigation'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

//  TODO add category , image , description for products
// TODO  add  russian and uzbek languages
//  TODO add user accounts and  function  of accessing through password
//  TODO work on tablet mode 
// TODO add search and filters on  sales ,customers and products lists
// TODO  function on charts  for  changing info display  date period
// TODO add wipe all data function


const Screens = createAppContainer(RootNavigation);
export default class App extends Component {
  render() {
    return (

      <Provider store={store}>
        <SafeAreaProvider>
          <Screens />
        </SafeAreaProvider>
      </Provider>
    );
  }
}



// styles  _________________________________________________________
