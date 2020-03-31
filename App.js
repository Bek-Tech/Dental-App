import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'; // back and forward navigator
import { createStackNavigator } from 'react-navigation-stack';
import PatientList from './screens/PatientList'

const stackNavigator = createStackNavigator({
  PatientList: {
    screen: PatientList,
    navigationOptions: {
      title: "Journal",
      headerStyle: {
        backgroundColor: '#9484DE'
      }
    }
  }
})


const App = createAppContainer(stackNavigator);

export default App

// styles  _________________________________________________________
