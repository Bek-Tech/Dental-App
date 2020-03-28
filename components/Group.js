import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native


const Group = ({ title, item }) => {

    return <GroupContainer>
        <GroupTitle>{title} </GroupTitle>
        <GroupItem>
            <UserImg source={item.userImg} />
            <View style={{ flex: 1 }}>
                <FullName>{item.userName}</FullName>
                <GrayText>{item.purpose}</GrayText>
            </View>
            <GroupTime active >{item.time}</GroupTime>
        </GroupItem>
    </GroupContainer>
}

//styles ____________________________________________________________

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


const GroupTitle = styled.Text`
font-weight: bold
font-size : 22px
color : #000000
  `
const GroupContainer = styled.View`
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

export default Group