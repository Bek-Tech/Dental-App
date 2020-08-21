import React, { useState } from 'react'
import { Text, Linking, View, Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'
import { useDispatch } from "react-redux"
import { SimpleLineIcons } from '@expo/vector-icons'
import ModalOptions from "../components/ModalOptions"
import { deleteCustomerAction } from "../actions/customersActions"
import * as colors from "./Colors"




const CustomerInfo = (props) => {


    const [modalVisible, setModalVisible] = useState(false)
    const { date, navigation, name, phone, detailsScreen, id } = props
    const dispatch = useDispatch()

    // ____________________styles

    const Container = styled.TouchableOpacity`
flex:1
border-radius: 15px
background: ${detailsScreen ? colors.secondaryColor : colors.secondaryBodyColor}
margin: 5px 5px
padding : 10px 15px
 shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`


    const Name = styled.Text`
font-weight : 800
font-size : 28px
line-height : 30px
margin-bottom: 5px
color: ${ detailsScreen ? colors.secondaryBodyColor : colors.mainTextColor}
`

    const DateText = styled.Text`
font-size : 16px
line-height : 30px
marginRight: 15px
color: ${ detailsScreen ? colors.secondaryBodyColor : colors.mainTextColor}
`

    const localData = new Date(date).toLocaleDateString()



    return <Container
        onPress={() => navigation.navigate('Details', { id })}>
        <ModalOptions
            visible={modalVisible}
            visibilityToggler={() => setModalVisible(!modalVisible)}
            onPressEdit={() => {
                setModalVisible(!modalVisible)
                navigation.navigate('AddCustomer', { id })
            }}
            onPressDelete={() => {
                dispatch(deleteCustomerAction(id))
                navigation.goBack()
            }}
            onPressCall={() => Linking.openURL(`tel://${phone}`)}
            onPressMessage={() => Linking.openURL(`sms://${phone}`)}
        />
        <RowDiv>
            <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Name>{name ? name : "deleted"}</Name>
            </View>
            <View style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>
                <DateText>reg : {localData}</DateText>
                <TouchableOpacity onPress={name ? () => setModalVisible(true) : () => alert("customer was deleted")}>
                    <SimpleLineIcons name="options-vertical" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </RowDiv>
        <RowDiv>
            <NumberText>phone : {phone ? phone : "deleted"}</NumberText>
        </RowDiv>
    </Container>

}




export default CustomerInfo









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




const NumberText = styled.Text`
font-size: 18px
 color : ${colors.secondaryTextColor}
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
