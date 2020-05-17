import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import RootContainer from "../components/RootContainer"
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import AddButton from "../components/AddButton"
import { fetchProducts } from "../DataBase/productsDB"
import { addProducts } from "../actions/productsActions"

const ProductsScreen = ({ products, navigation }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        fetchProducts()
            .then((result) => {
                dispatch(addProducts(result.rows._array))
            })
            .catch(err => {
                console.log('fetching failed.');
                console.log(err);
            });
    }, [])
    return (
        <>
            <RootContainer
                title='Products'
            >
                {products.map(item => {
                    return <ProductsContainer>
                        <NameText>{item.productName}</NameText>
                        <NameText>{item.stock}</NameText>
                    </ProductsContainer>
                }
                )
                }

            </RootContainer>
            <AddButton navigation={navigation} route="AddProduct" />
        </>
    )
}

const mapProductsToProp = state => {
    return {
        products: state.products
    }

}

export default connect(mapProductsToProp)(ProductsScreen)


const ProductsContainer = styled.TouchableOpacity`
flex:1 
border-radius: 15px
margin: 5px 15px
padding : 5px
background: black
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
color: white 
`