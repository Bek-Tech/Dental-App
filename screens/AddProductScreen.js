import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import CustomerInfo from "../components/CustomerInfo"
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect, useDispatch } from "react-redux"
import { insertProduct, updateProduct, updateProductStatus } from "../DataBase/productsDB"
import AddContainer from "../components/AddContainer"
import { addNewProduct, editProduct } from "../actions/productsActions"
import { ColorPicker } from 'react-native-color-picker'
import AddedProduct from '../components/AddedProduct';





const AddProductScreen = ({ navigation, products }) => {



    const id = navigation.getParam('id')
    const product = products.filter(item => item.id === id)
    const dispatch = useDispatch()
    const [name, setName] = useState(id ? product[0].name : "")
    const [stock, setStock] = useState(id ? product[0].stock : "")
    const [history, setHistory] = useState(id ? product[0].history : [])
    const [error, setError] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateString, setDateString] = useState(id ? product[0].date : date.toDateString())
    const [color, setColor] = useState(id ? product[0].color : "rgb(250,250,250)")


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

    const saveProduct = () => {
        const historyString = JSON.stringify(history)
        if (id) {

            name.length === 0 || stock.length === 0 ? setError(true) : dispatch(editProduct(id, dateString, name, stock, historyString, color))
            navigation.navigate('Products')

        } else {
            name.length === 0 || stock.length === 0 ? setError(true)
                : dispatch(addNewProduct(dateString, name, stock, historyString, color))
                    .then(() => {
                        navigation.navigate('Products')
                    })

        }
    }

    const deleteDelivery = (index) => {
        const editedDelivery = history.filter((item, i) => i !== index)
        setHistory(editedDelivery)

    }
    const changeDeliveryAmount = (value, index) => {

        const editedDelivery = history
        editedDelivery[index].quantity = value
        setHistory(editedDelivery)
    }

    return (
        <AddContainer
            BackButton={() => navigation.goBack()}
            title={id ? "Edit Product" : "Add New Product"}
            fullCover={true}
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
            <RowDiv >
                <View>
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
                </View>
                <View style={{ margin: 10, borderRadius: 15, width: 70, height: 70, backgroundColor: color }}>
                </View>

            </RowDiv>


            <ColorPicker
                onColorSelected={color => setColor(color)}
                style={{ height: 150, }}
                defaultColor={color}
            />



            <ProductsDiv>
                <Text>Delivery History</Text>
                {history.length === 0 ?
                    <EmptyDiv>
                        <Text>empty</Text>
                    </EmptyDiv> :

                    history.map((item, index) => {
                        return <AddedProduct
                            mode={"editProduct"}
                            key={item.id}
                            index={index}
                            onDelete={(id, index) => deleteDelivery(index)}
                            onChangeAmount={(value, index) => changeDeliveryAmount(value, index)}
                            {...item}
                        />
                    })
                }

            </ProductsDiv>

            <ButtonRowDiv>


                <ButtonStyled
                    onPress={() => saveProduct()}
                >
                    <ButtonText>Save</ButtonText>
                </ButtonStyled>
                <ButtonStyled onPress={() => navigation.navigate('Products')}   >
                    <ButtonText>Cancel</ButtonText>
                </ButtonStyled>
            </ButtonRowDiv>
        </AddContainer >
    );
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProductScreen)

// styles ________________________________________________

const EmptyDiv = styled.View`
flex:1
justify-content: center
align-items: center
${'' /* height: ${Dimensions.get('window').height / 3.5}px */}
`


const ProductsDiv = styled.ScrollView`
flex:1
margin-top: 5px
width: 100%
border-top-width: 2px
border-bottom-width: 2px
border-color: black
`

const ErrorText = styled.Text`
color: red
margin : 0px 10px
`




const DateText = styled.Text`
font-weight : 800
font-size : 28px
line-height : 30px
margin: 5px 10px

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
margin : 5px 10px
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
