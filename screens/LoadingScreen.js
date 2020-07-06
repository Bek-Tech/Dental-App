import React, { useState, useEffect, Component } from 'react'
import { View, Text, ActivityIndicator, ImageBackground, } from 'react-native';
import { initSales, fetchSales, sortSales } from '../DataBase/salesDB'
import { initCustomers, fetchCustomers } from '../DataBase/customersDB'
import { initProducts, fetchProducts } from '../DataBase/productsDB'
import { useDispatch } from 'react-redux'
import { addSales } from "../actions/salesActions"
import { addCustomers } from '../actions/customersActions'
import { addProducts } from "../actions/productsActions"


const LoadingScreen = ({ navigation }) => {

    const [progress, setProgress] = useState('loading...')


    const dispatch = useDispatch()

    useEffect(() => {
        initSales()
            .then(() => {
                dispatch(addSales())
                console.log('sales received...')


            })
            .catch(err => {
                console.log('Initializing salesDB failed.');
                console.log(err);
            })

        initCustomers()
            .then(() => {
                dispatch(addCustomers())
                console.log('customers received...')
            })
            .catch(err => {
                console.log('Initializing CustomersDB failed.');
                console.log(err);
            })

        initProducts()
            .then(() => {
                dispatch(addProducts())
                // dispatch(addSoldProducts())
                console.log('products and sold received...')
                navigation.navigate("MainFlow")

            })
            .catch(err => {
                console.log('Initializing productsDB failed.');
                console.log(err);
            })


    })


    return <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1F1F24"
    }}>

        <ActivityIndicator size="large" color="White" />
        <Text style={{ color: "white" }}>loading...</Text>

    </View>
}


export default LoadingScreen