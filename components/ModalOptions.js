import React, { useState } from 'react'
import { Modal, Text } from 'react-native';
import styled from 'styled-components/native'
import { Ionicons, Entypo, FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons'



const ModalOptions = ({ visible, visibilityToggler, onPressEdit, onPressDelete, onPressCall, onPressMessage, onPressIncome }) => {

    const [deleteModal, setDeleteModal] = useState(false)
    const [incomeModal, setIncomeModal] = useState(false)
    const [amount, setAmount] = useState(0)


    return <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
    >
        <Modal
            animationType="fade"
            transparent={true}
            visible={deleteModal}
        >
            <ModalContainer onPress={() => {
                setDeleteModal(false)
            }}>
                <ModalView>
                    <Text>Are You Sure?</Text>
                    <ModalRowDiv>
                        <ModalDeleteButton onPress={() => {
                            onPressDelete()
                            setDeleteModal(false)
                        }}  >
                            <ModalButtonText>
                                delete
                           </ModalButtonText>
                        </ModalDeleteButton>
                        <ModalCancelButton  >
                            <ModalButtonText onPress={() => setDeleteModal(false)}>
                                cancel
                           </ModalButtonText>
                        </ModalCancelButton>
                    </ModalRowDiv>
                </ModalView>
            </ModalContainer>

        </Modal>


        {/* <Modal
            animationType="fade"
            transparent={true}
            visible={incomeModal}
        >
            <ModalContainer onPress={() => {
                setDeleteModal(false)
            }}>
                <ModalView>
                    <Text>woohoo new  delivery</Text>
                    <AmountInput keyboardType="numeric" autoFocus={true} placeHolder="enter amount" />
                    <DescriptionInput multiline={true} />
                    <ModalRowDiv>
                        <ModalDeleteButton onPress={() => onPressIncome()}  >
                            <ModalButtonText>
                                save
                           </ModalButtonText>
                        </ModalDeleteButton>
                        <ModalCancelButton  >
                            <ModalButtonText onPress={() => setIncomeModal(false)}>
                                cancel
                           </ModalButtonText>
                        </ModalCancelButton>
                    </ModalRowDiv>
                </ModalView>
            </ModalContainer>

        </Modal> */}




        <ModalContainer onPress={() => {
            visibilityToggler();
        }}>
            <ModalView>

                <ModalRowDiv>
                    {onPressIncome ? <CircleButton onPress={() => setIncomeModal(true)}  >
                        <Entypo name="arrow-down" size={32} color="green" />
                    </CircleButton> : null}
                    {onPressEdit ? <CircleButton onPress={onPressEdit} >
                        <FontAwesome5 name="pen" size={22} color="#fff" />
                    </CircleButton> : null}
                    {onPressDelete ? <CircleButton onPress={() => setDeleteModal(true)} >
                        <MaterialIcons name="delete" size={24} color="#FA1200" />
                    </CircleButton> : null}
                    {onPressMessage ? <CircleButton onPress={onPressMessage} >
                        <Entypo name="message" size={24} color="#0F6CC0" />
                    </CircleButton> : null}
                    {onPressCall ? <CircleButton onPress={onPressCall} >
                        <Ionicons name="md-call" size={24} color="#4CBE2E" />
                    </CircleButton> : null}
                </ModalRowDiv>
            </ModalView>


        </ModalContainer>


    </Modal>
}



export default ModalOptions

const AmountInput = styled.TextInput`
width : 200px
background: grey
`
const DescriptionInput = styled.TextInput`
marginTop: 5px
width : 200px
height: 100px
background: grey
`


const ModalView = styled.View`

width: 250px
    background-color: white
    border-radius: 20px
    padding: 15px 0px
    align-items: center
    shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const ModalContainer = styled.TouchableOpacity`
background: rgba(0,0,0,0.8)
   borderWidth: 2px
    flex: 1
    justify-Content: center
    alignItems: center
   
`
const RowDiv = styled.View`
width: 100%
 ${'' /* borderColor: black
   borderWidth: 2px */}
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-evenly
align-items: center

`

const CircleButton = styled.TouchableOpacity`

align-items:center
justify-content: center
border-radius: 50px
width: 45px
height: 45px
background: black

shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const ModalRowDiv = styled.View`
width: 100%
 ${'' /* borderColor: black
   borderWidth: 2px */}
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-evenly
align-items: center

`


const ModalButtonText = styled.Text`
font-size: 19px
color : white
`

const ModalCancelButton = styled.TouchableOpacity`
margin: 10px 5px
width: 90px
height: 30px
border-radius : 25px
background-color: #4294ff
justify-content: center
align-items: center
`

const ModalDeleteButton = styled.TouchableOpacity`
margin: 10px 5px
width: 90px
height: 30px
border-radius : 25px
background-color:#FA1200
justify-content: center
align-items: center
`

const ModalSaveButton = styled.TouchableOpacity`
margin: 10px 5px
width: 90px
height: 30px
border-radius : 25px
background-color: green
justify-content: center
align-items: center
`