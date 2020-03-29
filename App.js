import React from 'react';
import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'
import Group from "./components/Group"

export default function App() {

  const state = [
    {
      title: "14 september",
      data: [
        {
          id: 2324,

          userName: "user name",
          purpose: "purpose of meeting",
          userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
          time: "12:30"
        },
        {
          id: 2334,
          userName: "user name",
          purpose: "purpose of meeting",
          userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
          time: "13:30"
        }
      ]

    },
    {
      title: "15 september",
      data: [
        {
          id: 2324,

          userName: "user name",
          purpose: "purpose of meeting",
          userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
          time: "12:30"
        },
        {
          id: 2334,
          userName: "user name",
          purpose: "purpose of meeting",
          userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
          time: "13:30"
        }
      ]
    }
  ]


  const item = ({ title }) => (
    <View>
      <Text>{title}</Text>
    </View>
  );

  return (
    <Container forceInset={{ top: 'always' }}>
      <LinearGradient colors={['#9484DE', '#49036C']}
        style={{ flex: 1 }} >

        <SectionList
          sections={state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Group {...item} />}
          renderSectionHeader={({ section: { title } }) => (
            <GroupTitle>{title} </GroupTitle>
          )}
        />


        {/* <FlatList
        data={state}
        keyExtractor={item => item.data.id}
        renderItem={({ item }) => {
          return <Group title={item.title} item={item.data} />
        }}
      /> */}
      </LinearGradient>
    </Container>
  );
}





// styles  _________________________________________________________
const Container = styled.SafeAreaView`
         flex:1
        marginTop: 50px 
      `

const GroupTitle = styled.Text`
font-weight: bold
font-size : 22px
color : #000000
  `