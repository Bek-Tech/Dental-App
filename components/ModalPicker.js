import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect, useDispatch } from "react-redux"


const ModalPicker = ({ show, showTrigger, dataName, pickedValue, data, soldProducts }) => {




    return <Modal
        animationType="fade"
        transparent={true}
        visible={show}
    >
        <ModalContainer>
            <ModalView>
                <ScrollView
                    style={{
                        // alignItems: "center",
                        // justifyContent: "center",
                        // borderColor: "black",
                        // borderWidth: 2,
                        width: Dimensions.get('window').width / 1.8,
                        height: Dimensions.get('window').height / 3.2

                    }}
                >
                    {dataName === "customers" ?
                        data.length === 0 || !data ?
                            <Text>your list is empty</Text> :
                            data.map(item => {
                                return <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderColor: "black",
                                        // borderBottomWidth: 2,
                                    }}
                                    onPress={() => {
                                        pickedValue(item)
                                        showTrigger();
                                    }}>
                                    <ListText >{item.name}</ListText>
                                </TouchableOpacity>
                            }) :
                        data.length === 0 || !data ?
                            <Text>your list is empty</Text> :
                            data.map(item => {
                                const inStock = soldProducts[item.id] ? item.totalReceived - soldProducts[item.id].totalSold : item.totalReceived
                                if (inStock < 0) {
                                    return <RowDiv key={item.id}>
                                        <GrayText>{item.name}</GrayText>
                                        <RedText>{inStock}</RedText>
                                    </RowDiv>
                                } else {
                                    return <TouchableOpacity
                                        key={item.id}
                                        style={{
                                            // borderColor: "black",
                                            // borderWidth: 2,
                                        }}
                                        onPress={() => {
                                            pickedValue(item)
                                            showTrigger();
                                        }}>
                                        <RowDiv>
                                            <ListText >{item.name}</ListText>
                                            <ListText>{inStock}</ListText>
                                        </RowDiv>
                                    </TouchableOpacity>
                                }

                            })
                    }



                </ScrollView>
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


const mapStateToProps = state => {
    return {
        soldProducts: state.salesHistory.productsSale
    }
}


export default connect(mapStateToProps)(ModalPicker)


const ListText = styled.Text`
color: #277FC4
font-size: 20px
marginTop: 5px
`
const GrayText = styled.Text`
color: gray
font-size: 20px
marginTop: 5px
`
const RedText = styled.Text`
color: red
font-size: 20px
marginTop: 5px
`

const RowDiv = styled.View`
    ${'' /* borderColor: black
   borderWidth: 2px */}
padding: 5px
flex-direction: row
justify-content: space-between
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
background-color: black
justify-content: center
align-items: center
`

const ModalView = styled.View`
borderWidth: 2px
borderColor: gray
width:${ Dimensions.get('window').width / 1.5}px
height: ${ Dimensions.get('window').height / 3}px 
    background-color: white
    border-radius: 20px
    padding: 10px
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
    marginBottom: 60px
`