import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { connect, useDispatch } from "react-redux"
import { restoreProduct, totallyDeleteProductAction } from '../actions/productsActions'
import { restoreCustomer, totallyDeleteCustomerAction } from '../actions/customersActions'
import { restoreSale, totallyDeleteSaleAction } from '../actions/salesActions'
import { fetchDeletedProducts } from "../DataBase/productsDB"
import { fetchDeletedCustomers, totallyDeleteCustomer } from '../DataBase/customersDB'
import { fetchDeletedSales } from '../DataBase/salesDB'




const ModalTrashBox = ({ show, showTrigger, soldProducts }) => {


    const dispatch = useDispatch()

    const [deletedProducts, setDeletedProducts] = useState([])
    const [deletedCustomers, setDeletedCustomers] = useState([])
    const [deletedSales, setDeletedSales] = useState([])


    useEffect(() => {
        fetchDeletedProducts().then(result => {
            setDeletedProducts(result.rows._array)
        })
        fetchDeletedCustomers().then(result => {
            setDeletedCustomers(result.rows._array)
        })
        fetchDeletedSales().then(result => {
            const parsedData = result.rows._array.map(item => {
                const parsedProductsArr = JSON.parse(item.productsArr)
                return { ...item, productsArr: parsedProductsArr }
            })
            setDeletedSales(parsedData)
        })


    }, [show])


    const restoreProductFunction = async (id) => {
        await dispatch(restoreProduct(id))
        fetchDeletedProducts().then(result => {
            setDeletedProducts(result.rows._array)
        })
    }
    const restoreCustomerFunction = (id) => {
        dispatch(restoreCustomer(id))
        fetchDeletedCustomers().then(result => {
            setDeletedCustomers(result.rows._array)
        })
    }
    const restoreSaleFunction = async (id) => {
        await dispatch(restoreSale(id))
        fetchDeletedSales().then(result => {
            setDeletedSales(result.rows._array)
        })
    }
    const totallyDeleteProductFunction = (id) => {
        dispatch(totallyDeleteProductAction(id))
        fetchDeletedProducts().then(result => {
            setDeletedProducts(result.rows._array)
        })

    }
    const totallyDeleteCustomerFunction = (id) => {
        dispatch(totallyDeleteCustomerAction(id))
        fetchDeletedCustomers().then(result => {
            setDeletedCustomers(result.rows._array)
        })

    }
    const totallyDeleteSaleFunction = (id) => {
        dispatch(totallyDeleteSaleAction(id))
        fetchDeletedSales().then(result => {
            const parsedData = result.rows._array.map(item => {
                const parsedProductsArr = JSON.parse(item.productsArr)
                return { ...item, productsArr: parsedProductsArr }
            })
            setDeletedSales(parsedData)
        })

    }



    return <Modal
        animationType="slide"
        transparent={true}
        visible={show}
    >





        <ModalContainer
            onPress={() => {
                showTrigger();
            }}>
            <ModalView>
                <TitleDiv>
                    <FontAwesome5 name="trash" size={30} color="black" />
                </TitleDiv>
                <ScrollView
                    style={{

                        padding: 5,
                        width: Dimensions.get('window').width / 1.2,
                        height: Dimensions.get('window').height / 3.5

                    }}
                >
                    <TitleDiv>
                        <TitleText>products</TitleText>
                    </TitleDiv>

                    {deletedProducts.length === 0 ?
                        <Text>your list is empty</Text> :
                        deletedProducts.map(item => {
                            return <ListItemDiv>
                                <GrayText>{item.name}</GrayText>
                                <ButtonsRowDiv>
                                    <Button onPress={() => restoreProductFunction(item.id)}>
                                        <MaterialCommunityIcons name="file-restore" size={28} color="green" />
                                    </Button>
                                    <Button onPress={() => totallyDeleteProductFunction(item.id)}>
                                        <FontAwesome5 name="trash" size={26} color="red" />
                                    </Button>

                                </ButtonsRowDiv>

                            </ListItemDiv>


                        })
                    }
                    <TitleDiv>
                        <TitleText>Customers</TitleText>
                    </TitleDiv>
                    {deletedCustomers.length === 0 ?
                        <Text>your list is empty</Text> :
                        deletedCustomers.map(item => {
                            return <ListItemDiv>
                                <GrayText>{item.name}</GrayText>
                                <ButtonsRowDiv>
                                    <Button onPress={() => restoreCustomerFunction(item.id)}>
                                        <MaterialCommunityIcons name="file-restore" size={28} color="green" />
                                    </Button>
                                    <Button onPress={() => totallyDeleteCustomerFunction(item.id)}>
                                        <FontAwesome5 name="trash" size={26} color="red" />
                                    </Button>

                                </ButtonsRowDiv>

                            </ListItemDiv>

                        })
                    }
                    <TitleDiv>
                        <TitleText>Sales</TitleText>
                    </TitleDiv>
                    {deletedSales.length === 0 ?
                        <Text>your list is empty</Text> :
                        deletedSales.map(item => {
                            return <SalesListView>
                                <ListItemDiv>
                                    <GrayText>{item.customerName}</GrayText>
                                    <ButtonsRowDiv>
                                        <Button onPress={() => restoreSaleFunction(item.id)}>
                                            <MaterialCommunityIcons name="file-restore" size={28} color="green" />
                                        </Button>
                                        <Button onPress={() => totallyDeleteSaleFunction(item.id)}>
                                            <FontAwesome5 name="trash" size={26} color="red" />
                                        </Button>



                                    </ButtonsRowDiv>

                                </ListItemDiv>
                                {item.productsArr.map(item => {
                                    return <RowDiv key={item.name}>
                                        <RowLeftView>
                                            <Text>{item.name}</Text>
                                        </RowLeftView>
                                        <RowRightView>
                                            <Text>{item.quantity}</Text>
                                        </RowRightView>
                                    </RowDiv>
                                })}

                            </SalesListView>
                        })
                    }






                </ScrollView>
                <RowDiv>
                    <ModuleButton
                        onPress={() => {
                            showTrigger();
                        }}>
                        <ModuleButtonText>cancel</ModuleButtonText>
                    </ModuleButton>
                </RowDiv>
            </ModalView>


        </ModalContainer>


    </Modal>
}


const mapStateToProps = state => {
    return {
        soldProducts: state.salesHistory.productsSale
    }
}


export default connect(mapStateToProps)(ModalTrashBox)


const SalesListView = styled.View`
borderColor: black
borderBottomWidth:2px
paddingBottom: 3px
`


const RowLeftView = styled.View`

${'' /* border-left-width:2px */}
border-color: gray
flex: 1
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowRightView = styled.View`
border-left-width:2px
border-color: gray
flex: 1
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`

const Button = styled.TouchableOpacity`
margin-left  : 10px
`

const ButtonsRowDiv = styled.View`
flex-direction: row
`

const ListItemDiv = styled.View`
width: 100%
flex-direction: row
justify-content: space-between
align-items : baseline
`

const TitleDiv = styled.View`
width: 100%
justify-content: center
align-items: center
`


const TitleText = styled.Text`
color: #277FC4
font-size: 30px
fontWeight : bold
${'' /* marginTop: 5px */}
`
const GrayText = styled.Text`
color: black
font-size: 20px
fontWeight : bold
marginTop: 8px
`
const RedText = styled.Text`
color: red
font-size: 20px
marginTop: 8px
`

const RowDiv = styled.View`
flex-direction: row
justify-content: space-between
align-items: center

`

const ModuleButtonText = styled.Text`
font-size: 19px
color : white
`


const ModuleButton = styled.TouchableOpacity`
margin: 10px 5px
width: 90px
height: 30px
border-radius : 25px
background-color: black
justify-content: center
align-items: center
`

const ModalView = styled.View`
borderWidth: 2px
borderColor: gray
height: ${ Dimensions.get('window').height / 1.3}px 
    background-color: white
    border-radius: 20px
    padding: 10px
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
    marginBottom: 60px
`