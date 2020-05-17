import React, { useState } from 'react'
import { Text, Linking, View, Modal } from 'react-native';
import styled from 'styled-components/native'
import Button from './Button'
import { Ionicons } from '@expo/vector-icons'

const CustomerInfo = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const { navigation, name, phone, id } = props
    // const [name, setName] = useState(userName)
    const [phoneNumber, setPhoneNumber] = useState(phone)


    const userState = {
        user_id: id,
        userName: name,
        phone
    }
    const [state, setState] = useState(userState)



    return <Container
        onPress={() => navigation.navigate('Details')}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <ModalContainer>
                <ModalView>
                    <View>
                        <EditInput
                            onChangeText={text => setName(text)}
                            value={name} />
                        <EditInput
                            onChangeText={text => setPhoneNumber(text)}
                            value={phoneNumber} />
                    </View>
                    <RowDiv>
                        <ModuleButton
                            onPress={() => setState({ ...state, userName: name, phone: phoneNumber })}                        >
                            <ModuleButtonText>save</ModuleButtonText>
                        </ModuleButton>
                        <ModuleButton
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <ModuleButtonText>cancel</ModuleButtonText>
                        </ModuleButton>
                    </RowDiv>
                </ModalView>


            </ModalContainer>


        </Modal>
        <Name>{state.userName}</Name>
        <GrayText>{state.phone}</GrayText>
        {/* {edit ? <View>
            <EditInput
                onChangeText={text => setName(text)}
                value={name} />
            <EditInput
                onChangeText={text => setPhoneNumber(text)}
                value={phoneNumber} />
        </View>
            : null} */}
        <RowDiv>
            <Button
                title={"save"}
                style={{
                    shadowOpacity: 0.5,
                    shadowRadius: 6.3,
                    elevation: 10
                }} color={"#4294ff"}
                action={() => {
                    setModalVisible(true);
                }} />
            <CallButton onPress={() => Linking.openURL(`tel: ${phone}`)} >
                <Ionicons name="md-call" size={30} color="#fff" />
            </CallButton>
        </RowDiv>
    </Container>
}




export default CustomerInfo


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


const EditInput = styled.TextInput`
 height: 40px
  borderColor: gray
   borderWidth: 1px
   background: #fff
   font-size : 18px
   border-radius: 15px
   padding : 0px  5px
   margin : 5px 0px
`



const Container = styled.TouchableOpacity`
margin: 5px 20px
 padding: 3px 20px
border-radius: 25px
margin-bottom: 4px
   ${'' /* flex-direction:row */}
   align-items: flex-start
  background : white
  shadow-color: #000
shadow-opacity: 0.2
shadow-radius: 6.3px
elevation: 10
`

const GrayText = styled.Text`
 color : #8b979f
 margin-bottom: 5px
`

const RowDiv = styled.View`
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-evenly
align-items: center

`


const Name = styled.Text`
font-weight : 800
font-size : 28px
line-height : 30px
margin-bottom: 5px

`

const CallButton = styled.TouchableOpacity`

align-items:center
justify-content: center
border-radius: 50px
width: 45px
height: 45px
background: #4CBE2E
shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`