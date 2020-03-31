import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'; // back and forward navigator
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import PatientList from './screens/PatientList'

const switchNavigator = createSwitchNavigator({
  PatientList: PatientList,

});

const App = createAppContainer(switchNavigator);

export default App

// styles  _________________________________________________________
