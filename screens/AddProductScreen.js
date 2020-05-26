import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import CustomerInfo from "../components/CustomerInfo"
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect, useDispatch } from "react-redux"
import { insertProduct, updateProduct } from "../DataBase/productsDB"
import RootContainer from "../components/RootContainer"
import { addNewProduct, editProduct } from "../actions/productsActions"
//insertProduct(date, name, stock) 



const AddProductScreen = ({ navigation, products }) => {

    const id = navigation.getParam('id')
    const product = products.filter(item => item.id === id)
    const dispatch = useDispatch()
    const [name, setName] = useState(id ? product[0].name : "")
    const [stock, setStock] = useState(id ? product[0].stock : "")
    const [error, setError] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateString, setDateString] = useState(id ? product[0].date : date.toDateString())

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
        <RootContainer
            title="Add Product"
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
                value={name}
                placeholder="enter product name"
                onChangeText={text => setName(text)} />
            {error ? <ErrorText>enter product name </ErrorText> : null}
            <Input
                value={`${stock}`}
                keyboardType="number-pad"
                placeholder="enter amount"
                onChangeText={num => setStock(num)} />
            <ButtonRowDiv>

                <ButtonStyled
                    onPress={() => {
                        if (id) {
                            name.length === 0 || stock.length === 0 ? setError(true) :
                                dispatch(editProduct(id, dateString, name, stock))
                                    .then(() => {
                                        console.log("product edited")
                                        navigation.navigate('Products')
                                    })
                        } else {
                            name.length === 0 || stock.length === 0 ? setError(true)
                                : dispatch(addNewProduct(dateString, name, stock))
                                    .then(() => {
                                        console.log("new product added")
                                        navigation.navigate('Products')
                                    })
                        }
                    }}  >
                    <ButtonText>Save</ButtonText>
                </ButtonStyled>
                <ButtonStyled onPress={() => navigation.navigate('Products')}   >
                    <ButtonText>Cancel</ButtonText>
                </ButtonStyled>
            </ButtonRowDiv>
        </RootContainer>
    );
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProductScreen)

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
padding: 5px 15px
flex-direction: row
justify-content: space-between
align-items: center

`

const ButtonRowDiv = styled.View`
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
