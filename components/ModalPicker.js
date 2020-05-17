import React, { useState } from 'react'
import { View, Text, Button, Modal, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'



const ModalPicker = ({ show, showTrigger, data, pickedValue }) => {
    // show = boolean
    // data = array
    //pickedValue = {(pickedValue)=>  set"someState"(pickedValue)}


    return <Modal
        animationType="fade"
        transparent={true}
        visible={show}
    >
        <ModalContainer>
            <ModalView>
                {data.map(item => {
                    return <TouchableOpacity
                        onPress={() => {
                            pickedValue(item)
                            showTrigger();
                        }}>
                        <Text >{item.name}</Text>
                    </TouchableOpacity>
                })}
                <RowDiv>
                    <ModuleButton
                        onPress={() => {
                            showTrigger();
                        }}>
                        <ModuleButtonText>cancel</ModuleButtonText>
                    </ModuleButton>
                </RowDiv>
            </ModalView>


        </ModalContainer>


    </Modal>
}



export default ModalPicker

const RowDiv = styled.View`
padding: 5px
flex-direction: row
justify-content: space-around
align-items: center

`

const ModuleButtonText = styled.Text`
font-size: 19px
color : white
`


const ModuleButton = styled.TouchableOpacity`
margin: 10px 5px
width: 90px
height: 30px
border-radius : 25px
background-color: #4294ff
justify-content: center
align-items: center
`

const ModalView = styled.View`
borderWidth: 2px
borderColor: gray
    margin: 20px
    background-color: white
    border-radius: 20px
    padding: 20px
    align-items: center
    shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const ModalContainer = styled.View`
flex: 1
    justify-Content: center
    alignItems: center
`