import React, { useState } from 'react'
import { Text, Linking, View, Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'
import { useDispatch } from "react-redux"
import { SimpleLineIcons } from '@expo/vector-icons'
import ModalOptions from "../components/ModalOptions"
import { deleteCustomerAction } from "../actions/customersActions"


const CustomerInfo = (props) => {

    const [modalVisible, setModalVisible] = useState(false)
    const { navigation, name, phone, id } = props
    const dispatch = useDispatch()





    return <Container
        onPress={() => navigation.navigate('Details')}>
        <ModalOptions
            visible={modalVisible}
            visibilityToggler={() => setModalVisible(!modalVisible)}
            onPressEdit
            onPressDelete={() => {
                dispatch(deleteCustomerAction(id))
                navigation.goBack()
            }}
            onPressCall={() => Linking.openURL(`tel://${phone}`)}
            onPressMessage={() => Linking.openURL(`sms://${phone}`)}
        />
        <RowDiv>
            <View>
                <Name>{name ? name : "deleted"}</Name>
                <NumberText>phone : {phone ? phone : "deleted"}</NumberText>
            </View>
            <TouchableOpacity onPress={name ? () => setModalVisible(true) : () => alert("customer was deleted")}>
                <SimpleLineIcons name="options-vertical" size={20} color="black" />
            </TouchableOpacity>
        </RowDiv>
        <RowDiv>

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
 borderColor: black
   borderBottomWidth: 2px
 padding: 3px 10px
margin-bottom: 4px
   ${'' /* flex-direction:row */}
   align-items: flex-start
  ${'' /* shadow-color: #000
shadow-opacity: 0.2
shadow-radius: 6.3px
elevation: 10 */}
`

const NumberText = styled.Text`
 color : white
 margin-bottom: 5px
`

const RowDiv = styled.View`
 ${'' /* borderColor: black
   borderWidth: 2px */}
width: 100%
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-between
${'' /* align-items: center */}

`



const Name = styled.Text`
font-weight : 800
font-size : 28px
line-height : 30px
margin-bottom: 5px

`



const DeleteButton = styled.TouchableOpacity`

align-items:center
justify-content: center
border-radius: 50px
width: 45px
height: 45px
background: #FA1200

shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`
