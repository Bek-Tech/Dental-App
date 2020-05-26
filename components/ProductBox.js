import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import { deleteProductAction } from "../actions/productsActions"
import { SimpleLineIcons } from '@expo/vector-icons'
import ModalOptions from './ModalOptions'









const ProductBox = ({ date, id, name, stock, navigation, sold }) => {


    const [totalSold, setTotalSold] = useState(0)

    useEffect(() => {


        sold[id].forEach(item => {
            return setTotalSold(totalSold + JSON.parse(item.quantity))
        })
        console.log("effect")
    }, [])





    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)

    return <ProductsContainer onPress={() => navigation.navigate("ProductDetails")}>
        <ModalOptions
            visible={modalVisible}
            visibilityToggler={() => setModalVisible(!modalVisible)}
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
            <View>
                <NameText>{name}</NameText>

                <NameText>stock : {stock}</NameText>
                <NameText>sold : {totalSold}</NameText>
                {/* <NameText>inStock  : {stock - totalSold}</NameText> */}

            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <SimpleLineIcons name="options-vertical" size={20} color="black" />
            </TouchableOpacity>
        </RowDiv>
    </ProductsContainer>

}


export default ProductBox


const ProductsContainer = styled.TouchableOpacity`
flex:1 
border-radius: 15px
background:white
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
   borderWidth: 2px */}
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-between
align-items: center

`