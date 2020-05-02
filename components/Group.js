import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native


const Group = (prop) => {
    const { customer, userImg, time, product, date } = prop
    return <GroupContainer>

        <GroupItem onPress={() => prop.navigate('Details', { customer: customer })}>
            <RowDiv>
                <UserImg source={{ uri: userImg }} />
                <FullName>{customer}</FullName>
            </RowDiv>

            <View style={{ flex: 1 }}>

                <FlatList
                    data={product}
                    keyExtractor={() => Math.floor(Math.random() * 999)}
                    renderItem={({ item }) => {
                        return <RowDiv>
                            <ProductText>  {item.name}  </ProductText>
                            <BoldText>{item.amount} kg</BoldText>
                        </RowDiv>

                    }}
                />
            </View>
            <DataRowDiv style={{ width: "100%" }}>
                <GroupTime >{time}</GroupTime>
                <BoldText>{date}</BoldText>
            </DataRowDiv>
        </GroupItem>
    </GroupContainer>
}

//styles ____________________________________________________________
const DataRowDiv = styled.View`
padding: 5px
flex-direction: row
justify-content: space-between
align-items: center

`

const BoldText = styled.Text`
font-size : 16px
font-weight: bold,
margin-left : 3px
margin-right: 15px
`

const RowDiv = styled.View`
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center

`

const GroupTime = styled.Text`
 margin-right: 10px
 background: #2a86ff
 color :  #fff
 border-radius: 25px
 font-weight: 600
 font-size : 18px
 width: 70px
 height: 32px
 text-align: center
 line-height : 30px
 shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const ProductText = styled.Text`
 background: #49036C
 color :  #fff
 border-radius: 25px
 font-weight: 600
 font-size : 18px
 text-align: center
 line-height : 30px
 shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const FullName = styled.Text`
font-weight: bold
font-size : 20px
`



const GroupContainer = styled.View`
   padding: 3px 20px
   shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
  `

const GroupItem = styled.TouchableOpacity`
background-color: #fff
border-radius: 25px
margin-bottom: 4px
   ${'' /* flex-direction:row */}
   align-items: flex-start
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