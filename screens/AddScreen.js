import React, { useState, useEffect } from 'react'
import { View, Text, Button, Modal, TouchableOpacity, Dimensions, Keyboard, KeyboardAvoidingView } from 'react-native'
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertSale } from "../DataBase/salesDB"
//insertSale(day, month, year, customerId, customerName, productsArr )
import AddContainer from "../components/AddContainer"
import AddedProduct from '../components/AddedProduct';
import ModalPicker from "../components/ModalPicker"
import { Entypo, AntDesign } from '@expo/vector-icons';
import { addNewSale, editSale } from "../actions/salesActions"
// editSale(id, day, month, year, customerId, customerName, productsArr) 
//addNewSale(day, month, year, customerId, customerName, productsArr )




const AddScreen = ({ navigation, products, customers, salesHistory, productsSale }) => {

    const id = navigation.getParam("id")
    const saleData = salesHistory.filter(item => item.id === id)




    console.log(saleData)



    const dispatch = useDispatch()
    const [showCustomerPicker, setShowCustomerPicker] = useState(false);
    const [showProductPicker, setShowProductPicker] = useState(false);
    const [error, setError] = useState(false)
    const [date, setDate] = useState(id ? new Date(saleData[0].year, saleData[0].month - 1, saleData[0].day) : new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const dateString = date.toDateString()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const [productsArr, setProductsArr] = useState([])
    const [pickedCustomer, setPickedCustomer] = useState(id ? { id: saleData[0].customerId, name: saleData[0].customerName } : { id: null, name: "Choose Customer" })
    const [pickedProduct, setPickedProduct] = useState({ id: null, name: "choose product" })
    const [productAmount, setProductAmount] = useState('')
    const [pickedItemId, setPickedItemId] = useState({})
    // console.log(dateString)
    // console.log("products")
    // console.log(saleData)


    if (id) {
        useEffect(() => {

            const productsArrOnEdit = []
            const idObj = {}
            saleData[0].productsArr.forEach(item => {
                idObj[item.id] = item.id
                const product = products.filter(productItem => {
                    return productItem.id === item.id
                })
                productsArrOnEdit.push(
                    {
                        ...product[0],
                        productObj: {
                            ...item
                        }
                    }
                )

            })
            setPickedItemId(idObj)
            setProductsArr(productsArrOnEdit)
        }, [])

    }



    const saveNewSale = () => {
        const productsArrData = productsArr.map(item => { return item.productObj })

        dispatch(addNewSale(day, month, year, pickedCustomer.id, pickedCustomer.name, productsArrData))

    }

    const saveChanges = () => {
        const productsArrData = productsArr.map(item => { return item.productObj })
        dispatch(editSale(id, day, month, year, pickedCustomer.id, pickedCustomer.name, productsArrData))
    }

    const addProduct = () => {
        const obj = {
            ...pickedProduct,
            productObj: {
                name: pickedProduct.name,
                customerId: pickedCustomer.id,
                id: pickedProduct.id,
                data: dateString,
                quantity: JSON.parse(productAmount),
            }
        }
        setProductsArr([...productsArr, obj])
    }



    const modalPickerData = products.filter(item => {
        return pickedItemId[item.id] !== item.id
    })

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
            title="Add Sale"
            BackButton={() => navigation.goBack()}
        >
            {/* //________________________________________________________ */}

            <ModalPicker
                dataName="customers"
                data={customers}
                pickedValue={(value) => {
                    setError(false)
                    setPickedCustomer(value)

                }}
                showTrigger={() => setShowCustomerPicker(!showCustomerPicker)}
                show={showCustomerPicker}
            />
            <ModalPicker
                dataName="products"
                data={modalPickerData}
                pickedValue={(value) => {
                    setError(false)
                    setPickedProduct(value)
                }}
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

            <RowDiv>
                <Picker
                    onPress={() => setShowCustomerPicker(!showCustomerPicker)}
                >
                    <Text>{pickedCustomer.name}</Text>
                    <Entypo name="arrow-with-circle-down" size={24} color="black" />
                </Picker>
                <ButtonStyled onPress={() => navigation.navigate("AddCustomer")}   >
                    <ButtonText>New Customer</ButtonText>
                </ButtonStyled>
            </RowDiv>

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
                    onChangeText={(value) => {
                        setError(false)
                        setProductAmount(value)
                    }} />
            </RowDiv>
            {error ? <ErrorText>Choose Customer and Product </ErrorText> : null}
            <AddButtonDiv>
                <AddButton
                    onPress={() => {
                        if (pickedProduct.id === null || productAmount === 0 || pickedCustomer.id === null) {
                            return setError(true)
                        } else {
                            setPickedItemId({ ...pickedItemId, [pickedProduct.id]: pickedProduct.id })
                            addProduct()
                            Keyboard.dismiss()
                            setPickedProduct({ id: null, name: "choose product" })
                            setProductAmount(0)
                        }
                    }}>
                    <AntDesign name="plus" size={24} color="#fff" />
                </AddButton>
            </AddButtonDiv>
            {/* _______________________list______________________________________ */}
            <KeyboardAvoidingView
                // behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ProductsDiv>
                    <Text>Products</Text>
                    {productsArr.length === 0 ?
                        <EmptyDiv>
                            <Text>empty</Text>
                        </EmptyDiv> :

                        productsArr.map((item, index) => {
                            return <AddedProduct
                                mode={id ? "editSale" : "newSale"}
                                key={item.id}
                                index={index}
                                onDelete={(id, index) => deleteProduct(id, index)}
                                onChangeAmount={(value, index) => changeAmountAddedProduct(value, index)}
                                {...item}
                            />
                        })
                    }

                </ProductsDiv>
            </KeyboardAvoidingView>



            <ButtonsRowDiv>
                <ButtonStyled
                    onPress={() => {
                        if (id) {
                            saveChanges()
                            navigation.navigate("SalesList")
                        } else {
                            pickedCustomer.id === null || productsArr.length === 0 ? setError(true)
                                : saveNewSale()
                            navigation.navigate("SalesList")
                        }



                    }}  >
                    <ButtonText>Save</ButtonText>
                </ButtonStyled>
                <ButtonStyled onPress={() => navigation.navigate('SalesList')}   >
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

export default connect(mapStateToProps)(AddScreen)


//styles_________________________________________________________

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
margin-top: 5px
width: 100%
height: ${Dimensions.get('window').height - 360}px
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
margin-bottom: 5px

`

const AmountInput = styled.TextInput`
width: 120px
height: 33px
border-width: 2px
border-color: black 
border-radius: 2px
padding: 0px 10px

`

const RowDiv = styled.View`
padding: 3px 0px 
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