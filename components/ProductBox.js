import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import { deleteProductAction, editProduct } from "../actions/productsActions"
//editProduct(id, date, name, stock, history)
import { SimpleLineIcons } from '@expo/vector-icons'
import ModalOptions from './ModalOptions'









const ProductBox = ({ date, id, name, stock, totalReceived, navigation, sold }) => {

    const totalSold = sold === null ? 0 : sold.totalSold
    // console.log("box")

    // console.log(sold)

    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)

    return <ProductsContainer onPress={() => navigation.navigate("ProductDetails")}>
        <ModalOptions
            visible={modalVisible}
            visibilityToggler={() => setModalVisible(!modalVisible)}
            onPressIncome={(amount) => console.log(amount)}
            onPressEdit={() => {
                navigation.navigate("AddProduct", { id: id })
                setModalVisible(false)
            }}
            onPressDelete={() => {
                dispatch(deleteProductAction(id))
                setModalVisible(!modalVisible)
            }}
            onPressCall={false}
            onPressMessage={false}
        />
        <RowDiv>

            <NameText>{name}</NameText>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <SimpleLineIcons name="options-vertical" size={20} color="black" />
            </TouchableOpacity>

        </RowDiv>
        <BlockRowDiv>
            <View>
                <SmallText>received</SmallText>
                <ReceivedNumText>{totalReceived}</ReceivedNumText>
            </View>
            <View>
                <SmallText>sold</SmallText>
                <SoldNumText>{totalSold}</SoldNumText>
            </View>
            <View>
                <SmallText>stock</SmallText>
                <StockNumText>{totalReceived - totalSold}</StockNumText>
            </View>

            {/* <NameText>inStock  : {stock - totalSold}</NameText> */}
        </BlockRowDiv>



    </ProductsContainer>

}


export default ProductBox


const ProductsContainer = styled.TouchableOpacity`
flex:1 
border-radius: 15px
background: grey
margin: 5px 15px
padding : 5px 15px
 shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const NameText = styled.Text`
font-weight : 800
font-size : 28px
line-height : 30px
margin-bottom: 5px
color: black
`

const RowDiv = styled.View`
width: 100%
 ${'' /* borderColor: black
   borderWidth: 2px  */}
padding: 3px 5px
flex-direction: row
justify-content: space-between
align-items: center

`
const BlockRowDiv = styled.View`
width: 100%
padding: 0px 5px
flex-direction: row
justify-content: space-between
align-items: center

`

const ReceivedNumText = styled.Text`
font-size : 18px
font-weight: bold
${'' /* line-height : 30px */}

color: blue
`
const SoldNumText = styled.Text`
font-size : 18px
font-weight: bold
${'' /* line-height : 30px */}

color: green
`
const StockNumText = styled.Text`
font-size : 18px
font-weight: bold
${'' /* line-height : 30px */}

color: black
`

const SmallText = styled.Text`
font-size : 16px
line-height : 30px

color: black
`