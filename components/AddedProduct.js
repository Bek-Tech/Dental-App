import React, { useState, useRef } from 'react'
import { View, Text, Button, Modal, TouchableOpacity, Dimensions, Keyboard } from 'react-native'
import styled from 'styled-components/native'
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import { connect, } from "react-redux"




const AddedProduct = (props) => {

    const { name, index, productObj, onChangeAmount, onDelete, id, totalReceived, mode, productsSale } = props

    const soldAmount = productsSale[id] ? productsSale[id].totalSold : 0




    const [productAmount, setProductAmount] = useState(productObj.quantity)
    const [error, setError] = useState(false)

    let inStock = 0
    const editProductAmount = useRef(productObj.quantity).current
    if (mode === "newSale") {
        inStock = totalReceived - soldAmount - productAmount
    }
    else if (mode === "editSale") {
        inStock = totalReceived - soldAmount + editProductAmount - productAmount
    } else {
        inStock = totalReceived - soldAmount + productAmount
    }


    // console.log(index)
    return (
        <RowDiv>
            <RowLeftView>

                <BoldText>{name}  </BoldText>
                <Text>  ({inStock})</Text>
            </RowLeftView>
            <RowRightView>
                <TouchableOpacity
                    onPress={() => productAmount === 0 ? null :
                        setProductAmount(productAmount - 1) +
                        onChangeAmount(productAmount - 1, index)
                    }
                >
                    <AntDesign name="minus" size={24} color="#fff" />
                </TouchableOpacity>

                <AddedAmountInput
                    textAlign="center"
                    keyboardType="number-pad"
                    value={`${productAmount}`}
                    onChangeText={(value) => {
                        const parsedValue = value ? JSON.parse(value) : value
                        setProductAmount(parsedValue)
                        onChangeAmount(parsedValue, index)
                    }}
                    onEndEditing={(value) => {
                        productAmount ? setError(false) : setError(true)
                    }}

                />
                <TouchableOpacity
                    onPress={() => {
                        setProductAmount(productAmount + 1)
                        onChangeAmount(productAmount + 1, index)
                    }}
                >
                    <AntDesign name="plus" size={24} color="#fff" />
                </TouchableOpacity>
                {error ?
                    <View>
                        <ErrorText>enter</ErrorText>
                        <ErrorText>amount</ErrorText>
                    </View> : null
                }

            </RowRightView>
            <DeleteButtonDiv onPress={() => {
                onDelete(id, index)

            }}>
                <FontAwesome name="trash-o" size={24} color="black" />
            </DeleteButtonDiv>
        </RowDiv>
    )
}
const mapStateToProp = state => {
    return {
        productsSale: state.salesHistory.productsSale
    }
}


export default connect(mapStateToProp)(AddedProduct)

const ErrorText = styled.Text`
font-size: 13
color: red
`


const DeleteButtonDiv = styled.TouchableOpacity`
borderWidth: 0px
paddingTop:7px
width: 20px
align-items: center
justify-content: flex-end
`

const RowLeftView = styled.View`
height: 20px
${'' /* border-left-width:2px */}
border-color: gray
flex: 4
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowRightView = styled.View`
height: 20px
${'' /* border-right-width:2px */}
border-left-width:2px
border-color: black
flex: 5
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`

const BoldText = styled.Text`
font-size : 16px
font-weight: bold,
margin-left : 3px
`

const AddedAmountInput = styled.TextInput`
width: 70px
margin:  0px 5px
height: 28px
border-width: 2px
border-color: black 
border-radius: 2px
padding: 0px 6px

`

const RowDiv = styled.View`
flex:1
padding: 3px 0px 
flex-direction: row
justify-content: space-between
align-items: center
margin-top: 5px
`

const QuantityRowDiv = styled.View`
flex:1 
flex-direction: row
justify-content: space-between
align-items: center
${'' /* borderWidth: 2px
border-color: black */}
`

const ModalView = styled.View`
borderWidth: 2px
borderColor: gray
width:200px
height: 100px 
    background-color: white
    border-radius: 20px
    padding: 10px
    align-items: center
    justify-content: center
    shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const ModalContainer = styled.TouchableOpacity`
flex: 1
    justify-Content: center
    alignItems: center
    marginBottom: 60px
`






