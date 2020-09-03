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
            })
            .catch(err => {
                alert('Initializing sales  data failed !')
            })

        initCustomers()
            .then(() => {
                dispatch(addCustomers())
            })
            .catch(err => {
                alert("Initializing customers data  failed !")

            })

        initProducts()
            .then(() => {
                dispatch(addProducts())

                navigation.navigate("MainScreens")

            })
            .catch(err => {
                alert("Initializing products data  failed !")
            })


    }, [])


    return <ImageBackground source={require("../assets/splash.png")}
        style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            alignItems: "center",
        }}>
        <View style={{
            position: "absolute",
            bottom: 100
        }}>

            <ActivityIndicator size="large" color="White" />
            <Text style={{ color: "white" }}>loading...</Text>

        </View>
    </ImageBackground>
}


export default LoadingScreen