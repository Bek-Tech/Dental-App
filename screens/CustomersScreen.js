import React, { useEffect } from 'react'
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
    const navigateToAddCustomer = () => navigation.navigate('AddCustomer')
    const dispatch = useDispatch()

    useEffect(() => {
        fetchCustomers()
            .then((result) => {
                dispatch(addCustomers(result.rows._array))
            })
            .catch(err => {
                console.log('fetching failed.');
                console.log(err);
            });
    }, [])

    return (
        <>
            <RootContainer
                title="Customers"
            >
                {customers.map(item => <CustomerInfo navigation={navigation}  {...item} />)}


            </RootContainer>

            <AddButton navigation={navigation} route="AddCustomer" />
        </>
    )
}

const mapCustomersToProps = state => {
    return {
        customers: state.customers
    }

}

export default connect(mapCustomersToProps)(CustomersScreen)

//styles ___________________


