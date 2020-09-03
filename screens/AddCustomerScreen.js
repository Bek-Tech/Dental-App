import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import { connect, useDispatch } from "react-redux"
import CustomerInfo from "../components/CustomerInfo"
import DateTimePicker from '@react-native-community/datetimepicker';
import AddContainer from "../components/AddContainer"
import { addNewCustomer, editCustomer } from "../actions/customersActions"
//insertCustomer (date, name, phone)



const AddCustomerScreen = ({ customers, navigation }) => {

    const id = navigation.getParam('id')
    const customer = customers.filter(item => item.id === id)
    const dispatch = useDispatch()

    const [name, setName] = useState(id ? customer[0].name : "")
    const [phone, setPhone] = useState(id ? customer[0].phone : "")

    const [error, setError] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateString, setDateString] = useState(id ? customer[0].date : date.toDateString())

    // const headerProps = { name, phone }

    // const day = date.getDay()
    // const month = date.getMonth() + 1
    // const year = date.getFullYear()



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDateString(currentDate.toDateString());
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };




    return (
        <AddContainer
            title={id ? "Edit Customer" : "Add New Customer"}
            BackButton={() => navigation.goBack()}

        >

            <RowDiv>
                <DateText>{dateString}</DateText>
                <ButtonStyled onPress={showDatepicker}   >
                    <ButtonText>Change Date</ButtonText>
                </ButtonStyled>
            </RowDiv>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <Input
                placeholder="enter name"
                value={name}
                onChangeText={text => setName(text)}
                maxLength={25}
            />
            {error ? <ErrorText>enter customer name </ErrorText> : null}
            <Input
                dataDetectorTypes='phoneNumber'
                multiline={true}
                keyboardType="phone-pad"
                value={`${phone}`}
                placeholder="phone number"
                onChangeText={num => setPhone(num)} />
            <RowDiv>

                <ButtonStyled
                    onPress={() => {
                        if (id) {
                            name.length === 0 || phone.length === 0 ? setError(true) :
                                dispatch(editCustomer(id, dateString, name, phone))
                                    .then(() => {
                                        navigation.goBack()
                                    })
                        } else {
                            name.length === 0 ? setError(true)
                                : dispatch(addNewCustomer(dateString, name, phone))
                            navigation.goBack()

                        }


                    }}  >
                    <ButtonText>Save</ButtonText>
                </ButtonStyled>
                <ButtonStyled onPress={() => navigation.goBack()}   >
                    <ButtonText>Cancel</ButtonText>
                </ButtonStyled>
            </RowDiv>
        </AddContainer>
    );
}

const mapStateToProp = state => {
    return {
        customers: state.customers
    }

}

export default connect(mapStateToProp)(AddCustomerScreen)

// styles ________________________________________________

const ErrorText = styled.Text`
color: red
margin : 0px 10px
`




const DateText = styled.Text`
font-weight : 800
font-size : 28px
line-height : 30px
margin-bottom: 5px

`

const Input = styled.TextInput`
width: 250px
border-width: 2px
border-color: black 
border-radius: 25px
padding: 0px 10px
margin : 5px 10px
`

const RowDiv = styled.View`
padding: 5px
flex-direction: row
justify-content: space-around
align-items: center

`

const ButtonText = styled.Text`
font-size : 16px
color : white
`

const ButtonStyled = styled.TouchableOpacity`
justify-content: center
align-items: center
border-radius: 25px
width: 120px
height : 40px
background: black
   shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
            shadow-opacity: 0.5
            shadow-radius: 6.3px
            elevation: 10

`

const ContainerView = styled.View`
flex:1
background : #261460
border-color : black
border-width : 2px

`
