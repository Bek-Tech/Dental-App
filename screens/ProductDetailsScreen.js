import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { Text, View, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Button from '../components/Button'
import { Ionicons, Foundation, Entypo } from '@expo/vector-icons'

import ProductBox from "../components/ProductBox"
import AddContainer from "../components/AddContainer"
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


const DetailsScreen = ({ navigation, productsSale, products }) => {



    const id = navigation.getParam('id')
    const product = products.filter(item => item.id === id)
    // const customer = customers.filter(item => item.name === CustomerName)
    console.log(productsSale[id])
    return (

        <AddContainer
            BackButton={() => navigation.goBack()}
            title="Details"
        >
            <ProductBox sold={productsSale[id]} navigation={navigation} {...product[0]} />
            <HistoryDiv>

                <Text>Product History</Text>
                <RowDiv>
                    <RowLeftView>
                        <Entypo name="arrow-bold-down" size={24} color="green" />
                        <LabelText>Received</LabelText>
                    </RowLeftView>
                    <RowRightView>
                        <Entypo name="arrow-bold-up" size={24} color="blue" />
                        <LabelText>Sold </LabelText>
                    </RowRightView>
                </RowDiv>
                <ListRowDiv>
                    <LeftListView>
                        <ListItemRowDiv>
                            <BoldText>{product[0].stock}</BoldText>
                            <GrayText>{new Date(product[0].date).toLocaleDateString()}</GrayText>
                        </ListItemRowDiv>

                        {product[0].history.map(item => {
                            const date = new Date(item.data).toLocaleDateString()
                            return <ListItemRowDiv key={`${item.quantity}${item.date}`}>
                                <BoldText>{item.quantity}</BoldText>
                                <GrayText>{date}</GrayText>
                            </ListItemRowDiv>
                        })}

                    </LeftListView>
                    <ListView>
                        {productsSale[id].soldArr.map(item => {
                            const date = new Date(item.data).toLocaleDateString()
                            return <ListItemRowDiv>
                                <BoldText>{item.quantity}</BoldText>
                                <GrayText>{date}</GrayText>
                            </ListItemRowDiv>
                        })}
                    </ListView>
                </ListRowDiv>
            </HistoryDiv>

        </AddContainer>

    )
}

const mapCustomersSalesHistoryToProps = state => {
    return {
        productsSale: state.salesHistory.productsSale,
        products: state.products
    }
}
export default connect(mapCustomersSalesHistoryToProps)(DetailsScreen)


// styles ___________________________________


const ListItemRowDiv = styled.View`
width : 100%
${'' /* border-width : 2px
border-color: black */}
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-between
align-items: baseline

`


const LeftListView = styled.View`

border-right-width:2px
border-color: grey
flex: 1
height: 100%
padding: 5px
justify-content: flex-start
align-items: flex-start
`



const ListView = styled.View`

${'' /* border-width:2px
border-color: black */}
flex: 1
height: 100%
padding: 5px
justify-content: flex-start
align-items: flex-start
`

const DataView = styled.View`
    justify-content: center
     align-items: center
  
`

const HistoryDiv = styled.View`
height: ${windowHeight / 1.7}px
padding: 15px 
margin: 5px 0px
background : white
border-radius : 25px
shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const LabelText = styled.Text`
font-size: 16px
margin-left: 10px
`
const BoldText = styled.Text`
font-size : 16px
font-weight: bold,
margin-left : 3px
`

const RowLeftView = styled.View`

${'' /* border-left-width:2px */}
border-bottom-width: 2px
border-color: gray
flex: 1
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowRightView = styled.View`
${'' /* border-right-width:2px */}
border-left-width:2px
border-bottom-width: 2px
border-color: gray
flex: 1
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowDiv = styled.View`
width : 100%
${'' /* border-width : 2px
border-color: black */}
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-evenly
align-items: center

`
const ListRowDiv = styled.View`
width : 100%
height: 90% 
${'' /* border-width : 2px
border-color: black */}
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-evenly
align-items: center

`




const GrayText = styled.Text`
 color : #8b979f

`