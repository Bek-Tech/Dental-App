import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'; // back and forward navigator
import { createStackNavigator } from 'react-navigation-stack';
import PurchasesList from './screens/PurchasesList'
import DetailsScreen from './screens/DetailsScreen'
import AddScreen from './screens/AddScreen'
import { Provider } from 'react-redux'
import store from "./reducers/index"


const stackNavigator = createStackNavigator({
  PurchasesListt: {
    screen: PurchasesList,
    navigationOptions: {
      title: "Journal",
      headerStyle: {
        backgroundColor: '#9484DE'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      title: "Details",
      headerStyle: {
        backgroundColor: '#9484DE'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  Add: {
    screen: AddScreen,
    navigationOptions: {
      title: "Add New Purchase",
      headerStyle: {
        backgroundColor: '#9484DE'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }

})


const Screens = createAppContainer(stackNavigator);
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
