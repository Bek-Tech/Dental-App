import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native


export default function App() {
  return (

    <Container>
      <Group>
        <GroupTitle>12 September </GroupTitle>
        <GroupItem>
          <UserImg source={{ uri: `https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg` }} />
          <View style={{ flex: 1 }}>
            <FullName>User Name</FullName>
            <GrayText>Purpose of meeting</GrayText>
          </View>
          <GroupTime>12:30</GroupTime>
        </GroupItem>
      </Group>
    </Container>
  );
}





// styles  _________________________________________________________

const GroupTime = styled.Text`
 border-radius: 16px
 background: #e9f5ff
 color : #4294ff
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

const GroupItem = styled.View`
   flex-direction: row
   align-items: center
   padding: 20px 0
  `

const UserImg = styled.Image`
margin-right: 20px
  border-radius: 50px
  height: 40px
  width: 40px

  `
