import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'
import Group from "./components/Group"

export default function App() {

  const state = [
    {
      id: 2324,
      data: "13 september",
      userName: "user name",
      purpose: "purpose of meeting",
      userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
      time: "12:30"
    },
    {
      id: 2334,
      data: "13 september",
      userName: "user name",
      purpose: "purpose of meeting",
      userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
      time: "13:30"
    }

  ]
  return (

    <Container>
      <LinearGradient colors={['transparent', '#9484DE',]}
        style={{ flex: 1 }} >
        <FlatList
          data={state}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            console.log(item)
            return <Group title={item.data} item={item} />
          }}
        />
      </LinearGradient>
    </Container>
  );
}





// styles  _________________________________________________________
const Container = styled.View`
         flex:1
        marginTop: 50px 
      `

