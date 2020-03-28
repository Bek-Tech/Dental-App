import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'

export default function App() {
  return (

    <Container>
      <LinearGradient colors={['transparent', '#9484DE',]}
        style={{ flex: 1 }} >
        <Group>
          <GroupTitle>12 September </GroupTitle>
          <GroupItem>
            <UserImg source={{ uri: `https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg` }} />
            <View style={{ flex: 1 }}>
              <FullName>User Name</FullName>
              <GrayText>Purpose of meeting</GrayText>
            </View>
            <GroupTime active >12:30</GroupTime>
          </GroupItem>

          <GroupItem>

            <UserImg source={{ uri: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80` }} />
            <View style={{ flex: 1, backgroundColor: "trancparent" }}>
              <FullName>User Name</FullName>
              <GrayText>Purpose of meeting</GrayText>
            </View>
            <GroupTime  >13:30</GroupTime>

          </GroupItem>

        </Group>
      </LinearGradient>
    </Container>
  );
}





// styles  _________________________________________________________

const GroupTime = styled.Text`
 margin-right: 10px
 background:  ${props => (props.active ? "#2a86ff" : "#e9f5ff")}
 color : ${props => (props.active ? "#fff" : "#4294ff")}
 border-radius: 16px
 font-weight: 600
 font-size : 18px
 width: 70px
 height: 32px
 text-align: center
 line-height : 30px
`

const GrayText = styled.Text`
 color : #8b979f
`

const FullName = styled.Text`
font-weight: 900
font-size : 16px
`

const Container = styled.View`
     flex:1
    marginTop: 50px 
  `
const GroupTitle = styled.Text`
font-weight: bold
font-size : 22px
color : #000000
  `
const Group = styled.View`
   padding: 0 20px
  `

const GroupItem = styled.TouchableOpacity`
background-color: #fff
border-radius: 10px
margin-bottom: 4px
   flex-direction: row
   align-items: center
   padding: 20px 0
  `

const UserImg = styled.Image`
margin-right: 20px
margin-left: 10px
  border-radius: 50px
  height: 40px
  width: 40px

  `
