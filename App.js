import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'; // back and forward navigator
import { createStackNavigator } from 'react-navigation-stack';
import PatientList from './screens/PatientList'
import DetailsScreen from './screens/DetailsScreen'

const stackNavigator = createStackNavigator({
  PatientList: {
    screen: PatientList,
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
  }

})


const App = createAppContainer(stackNavigator);

export default App

// styles  _________________________________________________________
