import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'; // back and forward navigator
import { Provider } from 'react-redux'
import store from "./reducers/index"
import RootNavigation from './navigation'
import { init } from './DataBase/db';

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });

// const stackNavigator = createStackNavigator({
//   PurchasesList: {
//     screen: PurchasesList,
//     navigationOptions: {
//       title: "Journal",
//       headerStyle: {
//         backgroundColor: '#9484DE'
//       },
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }
//   },
//   Details: {
//     screen: DetailsScreen,
//     navigationOptions: {
//       title: "Details",
//       headerStyle: {
//         backgroundColor: '#9484DE'
//       },
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }
//   },
//   Add: {
//     screen: AddScreen,
//     navigationOptions: {
//       title: "Add New Purchase",
//       headerStyle: {
//         backgroundColor: '#9484DE'
//       },
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }
//   }

// })


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
