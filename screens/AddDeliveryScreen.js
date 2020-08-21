import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Button, Modal, TouchableOpacity, Dimensions, Keyboard, RefreshControl } from 'react-native'
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import AddContainer from "../components/AddContainer"
import ModalPicker from "../components/ModalPicker"
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import { editProduct } from "../actions/productsActions"
// editProduct(id, date, name, stock, history)
import AddedProduct from '../components/AddedProduct';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;



const AddDeliveryScreen = ({ navigation, products, customers, salesHistory, productsSale }) => {


    const dispatch = useDispatch()
    const [showProductPicker, setShowProductPicker] = useState(false);
    const [error, setError] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const dateString = date.toDateString()
    const [productsArr, setProductsArr] = useState([])
    const [pickedProduct, setPickedProduct] = useState({ id: null, name: "choose product" })
    const [productAmount, setProductAmount] = useState('')
    const [pickedItemId, setPickedItemId] = useState({})



    const modalPickerData = products.filter(item => {
        return pickedItemId[item.id] !== item.id
    })





    const saveNewDelivery = () => {
        productsArr.forEach(item => {
            const historyArr = [...item.history, item.productObj]
            const stringHistoryArr = JSON.stringify(historyArr)
            dispatch(editProduct(item.id, item.date, item.name, item.stock, stringHistoryArr, item.color))
        })

    }


    const addProduct = () => {
        const obj = {
            ...pickedProduct,
            productObj: {
                id: pickedProduct.id,
                data: dateString,
                quantity: JSON.parse(productAmount),
            }
        }
        setProductsArr([...productsArr, obj])
    }

    const deleteProduct = (id, index) => {
        const result = productsArr.filter((item, i) => { return i !== index })
        setPickedItemId({ ...pickedItemId, [id]: false })
        setProductsArr(result)
    }

    const changeAmountAddedProduct = (value, index) => {
        const result = productsArr
        result[index].productObj.quantity = value
        setProductsArr(result)
    }








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




    return (

        <AddContainer
            BackButton={() => navigation.goBack()}
            title=" New Delivery"
        >

            {/* __________________________________________________________________ */}
            <ModalPicker
                dataName="products"
                data={modalPickerData}
                pickedValue={(value) => setPickedProduct(value)}
                showTrigger={() => setShowProductPicker(!showProductPicker)}
                show={showProductPicker}
            />

            <RowDiv style={{ padding: 10 }}>
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


            <RowDiv>
                <Picker
                    onPress={() => setShowProductPicker(!showProductPicker)}
                >
                    <Text>{pickedProduct.name}</Text>
                    <Entypo name="arrow-with-circle-down" size={24} color="black" />
                </Picker>
                <AmountInput
                    keyboardType="number-pad"
                    placeholder=" amount"
                    value={productAmount}
                    onChangeText={(value) => setProductAmount(value)} />
            </RowDiv>
            <AddButtonDiv>
                <AddButton
                    onPress={() => {
                        pickedProduct.id === null ?
                            setError(true) + console.log("error") :
                            setPickedItemId({ ...pickedItemId, [pickedProduct.id]: pickedProduct.id })
                        addProduct()
                        Keyboard.dismiss()
                        setPickedProduct({ id: null, name: "choose product" })
                        setProductAmount(0)
                    }}>
                    <AntDesign name="plus" size={24} color="#fff" />
                </AddButton>
            </AddButtonDiv>
            {/* _________________aded products list_____________________________________ */}

            <ProductsDiv>
                <Text>Products</Text>
                {productsArr.length === 0 ?
                    <EmptyDiv>
                        <Text>empty</Text>
                    </EmptyDiv> :

                    productsArr.map((item, index) => {
                        return <AddedProduct
                            key={item.id}
                            index={index}
                            onDelete={(id, index) => deleteProduct(id, index)}
                            onChangeAmount={(value, index) => changeAmountAddedProduct(value, index)}
                            {...item}
                        />
                    })
                }

            </ProductsDiv>





            <ButtonsRowDiv>
                <ButtonStyled
                    onPress={() => {
                        productsArr.length === 0 ? setError(true)
                            : saveNewDelivery()
                        navigation.navigate("Products")

                    }}  >
                    <ButtonText>Save</ButtonText>
                </ButtonStyled>
                <ButtonStyled onPress={() => navigation.goBack()}   >
                    <ButtonText>Cancel</ButtonText>
                </ButtonStyled>
            </ButtonsRowDiv>
        </AddContainer>

    );
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        customers: state.customers,
        salesHistory: state.salesHistory.sales,
        productsSale: state.salesHistory.productsSale
    }
}

export default connect(mapStateToProps)(AddDeliveryScreen)


//styles_________________________________________________________

const DeleteButtonDiv = styled.TouchableOpacity`
borderWidth: 0px
paddingTop:7px
width: 20px
align-items: center
justify-content: flex-end
`

const RowLeftView = styled.View`
height: 20px
${'' /* border-left-width:2px */}
border-color: gray
flex: 1
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowRightView = styled.View`
height: 20px
${'' /* border-right-width:2px */}
border-left-width:2px
border-color: black
flex: 1
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`

const EmptyDiv = styled.View`
flex:1
justify-content: center
align-items: center
${'' /* height: ${Dimensions.get('window').height / 3.5}px */}

`
const BoldText = styled.Text`
font-size : 16px
font-weight: bold,
margin-left : 3px
`

const AddButtonDiv = styled.View`
height: 60px
width: 100%
justify-content: center
align-items: center
`

const AddButton = styled.TouchableOpacity`
        height: 50px
        width: 50px
        align-items:center
        justify-content: center
        border-radius: 50px
     
        background:black
        shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
            shadow-opacity: 0.5
            shadow-radius: 6.3px
            elevation: 10
            `


const ProductsDiv = styled.ScrollView`
flex:1
margin-top: 5px
width: 100%
height: ${ windowHeight - 310}px
border-top-width: 2px
border-bottom-width: 2px
border-color: black
`



const Picker = styled.TouchableOpacity`
flex-direction: row 

align-items: center
justify-content: space-between
width: 230px
height: 33px
border-width: 2px
border-color: black 
border-radius: 2px
padding: 0px 5px
 
`


const ErrorText = styled.Text`
color: red
margin : 0px 10px
`




const DateText = styled.Text`
font-weight : 800
font-size : 28px
line-height : 30px
${'' /* margin-bottom: 5px */}

`

const AmountInput = styled.TextInput`
width: 120px
height: 33px
border-width: 2px
border-color: black 
border-radius: 2px
padding: 0px 10px

`
const AddedAmountInput = styled.TextInput`
width: 100px
align-items: center
justify-content: center
height: 33px
border-width: 2px
border-color: black 
border-radius: 2px
padding: 0px 6px

`

const ListRowDiv = styled.View`
flex:1
flex-direction: row
align-items: center
margin: 5px 0px
`

const RowDiv = styled.View`
${'' /* padding: 3px 0px  */}
flex-direction: row
justify-content: space-between
align-items: center
margin-top: 5px
`
const ButtonsRowDiv = styled.View`
padding: 3px 0px 
flex-direction: row
justify-content: space-around
align-items: center
margin-top: 5px
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
height : 35px
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

const ModalView = styled.View`
borderWidth: 2px
borderColor: gray
width:200px
height: 100px 
    background-color: white
    border-radius: 20px
    padding: 10px
    align-items: center
    justify-content: center
    shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const ModalContainer = styled.TouchableOpacity`
flex: 1
    justify-Content: center
    alignItems: center
    marginBottom: 60px
`