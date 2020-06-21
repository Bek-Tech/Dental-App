import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { connect, useDispatch } from "react-redux"
import { FlatList } from 'react-native-gesture-handler';
import RootContainer from "../components/RootContainer"
import AddButton from '../components/AddButton'
import CustomerInfo from "../components/CustomerInfo"
import { fetchCustomers } from "../DataBase/customersDB"
import { addCustomers } from '../actions/customersActions'


const CustomersScreen = ({ navigation, customers }) => {

    const [empty, setEmpty] = useState(false)
    return (
        <>
            <RootContainer
                title="Customers"
                addButton={() => navigation.navigate("AddCustomer")}
            >
                {customers.length > 0 ?
                    <FlatList
                        data={customers}
                        keyExtractor={(item => `${item.id}`)}
                        renderItem={({ item }) => {
                            return <CustomerInfo navigation={navigation}  {...item} />
                        }}
                    /> :
                    null
                }


            </RootContainer>


        </>
    )
}

const mapCustomersToProps = state => {
    return {
        customers: state.customers,
        salesHistory: state.salesHistory.sales
    }

}

export default connect(mapCustomersToProps)(CustomersScreen)

//styles ___________________


