import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native


const Group = (prop) => {
    const { customer, time, product, date, quantity } = prop.data
    return <GroupContainer>

        <GroupItem onPress={() => prop.navigate('Details', { customer: prop.data })}>
            <UserImg source={{ uri: customer.userImg }} />
            <View style={{ flex: 1 }}>
                <FullName>{customer.userName}</FullName>
                <RowDiv>
                    <GrayText>{product} :</GrayText>
                    <BoldText>{quantity} kg</BoldText>
                </RowDiv>
                <BoldText>{date}</BoldText>
            </View>
            <GroupTime >{time}</GroupTime>
        </GroupItem>
    </GroupContainer>
}

//styles ____________________________________________________________
const BoldText = styled.Text`
font-size : 16px
font-weight: bold,
margin-left : 3px
`

const RowDiv = styled.View`
padding: 5px
flex-direction: row
justify-content: center
align-items: center

`

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