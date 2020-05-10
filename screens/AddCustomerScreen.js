import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import CustomerInfo from "../components/CustomerInfo"

const AddCustomerScreen = () => {
    return <ContainerView>
        <Text>Add Customer Screen</Text>
        <CustomerInfo />
    </ContainerView>

}

export default AddCustomerScreen

// styles ________________________________________________

const ContainerView = styled.View`
flex:1
background : #261460
border-color : black
border-width : 2px

`
