import React, { Component, } from 'react';
import { createAppContainer } from 'react-navigation'; // back and forward navigator
import { Provider, useDispatch } from 'react-redux'
import store from "./reducers/index"
import RootNavigation from './navigation'






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
