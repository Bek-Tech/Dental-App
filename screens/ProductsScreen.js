import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Button, Dimensions } from 'react-native'
import RootContainer from "../components/RootContainer"
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import AddButton from "../components/AddButton"
import { deleteProductAction } from "../actions/productsActions"
import { SimpleLineIcons } from '@expo/vector-icons'
import ProductBox from '../components/ProductBox'



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ProductsScreen = ({ products, salesHistory, navigation, soldProducts }) => {
    // console.log("products screen")
    // console.log(products)
    // console.log(soldProducts)
    const dispatch = useDispatch()
    return (
        <>
            <RootContainer
                backToTopButton={products.length > 5 ? true : false}
                title='Products'
                addButton={() => navigation.navigate("AddProduct", { id: null })}
                navigation={navigation}
            >


                {products.length > 0 ?
                    products.map(item => {
                        return <ProductBox
                            key={item.id}
                            sold={soldProducts[item.id] ? soldProducts[item.id] : null} navigation={navigation} {...item} />
                    }) :
                    <EmptyListDiv>
                        <EmptyText>List Empty</EmptyText>
                    </EmptyListDiv>
                }

            </RootContainer>

        </>
    )
}

const mapProductsToProp = state => {
    return {
        products: state.products,
        salesHistory: state.salesHistory.sales,
        soldProducts: state.salesHistory.productsSale
    }

}

export default connect(mapProductsToProp)(ProductsScreen)


const EmptyListDiv = styled.View`
flex:1
height: ${windowHeight / 2.5}px
align-items:center
justify-content: center
`

const EmptyText = styled.Text`
font-size: 18px
`


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