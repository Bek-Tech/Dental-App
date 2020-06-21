import React, { useState } from 'react'
import { View, Text, Button, Modal, TouchableOpacity, Dimensions, Keyboard } from 'react-native'
import styled from 'styled-components/native'
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';





const AddedProduct = (props) => {

    const { name, deliveryObj, index, onChangeAmount, onDelete, id, totalReceived } = props

    const [productAmount, setProductAmount] = useState(deliveryObj.quantity)

    const remainInStock = totalReceived + productAmount

    // console.log(index)
    return (
        <RowDiv>
            <RowLeftView>

                <BoldText>{name}  </BoldText>
                <Text>  ({remainInStock})</Text>
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
                        const parsedValue = JSON.parse(value)
                        setProductAmount(parsedValue)
                        onChangeAmount(parsedValue, index)
                    }}
                    onEndEditing={() => { }}

                />
                <TouchableOpacity
                    onPress={() => {
                        setProductAmount(productAmount + 1)
                        onChangeAmount(productAmount + 1, index)
                    }}
                >
                    <AntDesign name="plus" size={24} color="#fff" />
                </TouchableOpacity>
            </RowRightView>
            <DeleteButtonDiv onPress={() => {
                onDelete(id, index)

            }}>
                <FontAwesome name="trash-o" size={24} color="black" />
            </DeleteButtonDiv>
        </RowDiv>
    )
}



export default AddedProduct


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






