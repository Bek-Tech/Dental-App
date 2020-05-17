import React, { useState } from 'react'
import { View, Text, Button, Modal, TouchableOpacity } from 'react-native'
import { connect } from "react-redux"
import styled from 'styled-components/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertSale } from "../DataBase/salesDB"
//insertSale(day, month, year, customerId, customerName, productsArr )
import RootContainer from "../components/RootContainer"
import ModalPicker from "../components/ModalPicker"

const AddScreen = ({ navigation, products, customers }) => {

    const [showCustomerPicker, setShowCustomerPicker] = useState(false);
    const [showProductPicker, setShowProductPicker] = useState(false);
    const [error, setError] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const dateString = date.toDateString()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const [customerId, setCustomerId] = useState(null)
    const [customerName, setCustomerName] = useState('')
    const [productsArr, setProductsArr] = useState([])
    const [pickedValue, setPickedValue] = useState(null)

    const saleObj = {
        day,
        month,
        year,
        customerId,
        customerName,
        productsArr
    }

    console.log("addacreen " + showCustomerPicker)

    // const headerProps = { name, phone }

    // const day = date.getDay()
    // const month = date.getMonth() + 1
    // const year = date.getFullYear()



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    const HeaderComponent = () => {
        return <View style={{ flex: 1, justifyContent: "center" }}>
            <Text>{name}</Text>
            <Text>{stock}</Text>

        </View>

    }



    return (
        <RootContainer
            title="Add Product"
        >
            {/* //________________________________________________________ */}

            <ModalPicker
                data={customers}
                pickedValue={(value) => setPickedValue(value)}
                showTrigger={() => setShowCustomerPicker(!showCustomerPicker)}
                show={showCustomerPicker}
            />
            <ModalPicker
                data={products}
                pickedValue={(value) => setPickedValue(value)}
                showTrigger={() => setShowProductPicker(!showProductPicker)}
                show={showProductPicker}
            />

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
            <Button
                title='choose customer'
                onPress={() => setShowCustomerPicker(!showCustomerPicker)}
            />
            <Button
                title='choose product'
                onPress={() => setShowProductPicker(!showProductPicker)}
            />
            <Input placeholder="enter product name" onChangeText={text => setName(text)} />
            {error ? <ErrorText>enter product name </ErrorText> : null}
            {/* <Input keyboardType="number-pad" placeholder="enter amount" onChangeText={num => setStock(num)} /> */}
            <RowDiv>

                <ButtonStyled
                    onPress={() => {
                        name.length === 0 ? setError(true)
                            : insertSale(dateString, name, stock).then(() => {
                                console.log("new product added")
                                navigation.navigate('Products')
                            })
                    }}  >
                    <ButtonText>Save</ButtonText>
                </ButtonStyled>
                <ButtonStyled onPress={() => navigation.navigate('SalesList')}   >
                    <ButtonText>Cancel</ButtonText>
                </ButtonStyled>
            </RowDiv>
        </RootContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        customers: state.customers
    }
}

export default connect(mapStateToProps)(AddScreen)




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