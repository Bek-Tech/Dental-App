import React, { useState, useEffect, Component } from 'react'
import { Text, View } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'
import Group from "../components/Group"
import AddButton from '../components/AddButton'
import { connect } from "react-redux"
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'

const SalesListScreen = ({ salesHistory, navigation }) => {


    // const fetchData = async () => {
    //     await fetch('https://my-json-server.typicode.com/Bek-Tech/fakeJson/data').then((res) => res.json()).then((data) => {
    //         const result = data.purchases.map(item => ({
    //             data: {
    //                 ...item,
    //                 customer: data.customers.filter(user => user.user_id === item._id)[0]
    //             }
    //         }))
    //         const sortedResult = result.slice().sort((a, b) => {
    //             a = new Date(a.date);
    //             b = new Date(b.date);
    //             return a > b ? -1 : a < b ? 1 : 0;
    //         })
    //         setData(sortedResult)
    //     })

    // }
    // useEffect(() => {
    //     fetch('https://my-json-server.typicode.com/Bek-Tech/fakeJson/data').then((res) => res.json()).then((data) => {
    //         const result = data.purchases.map(item => ({
    //             data: {
    //                 ...item,
    //                 customer: data.customers.filter(user => user.user_id === item._id)[0]
    //             }
    //         }))
    //         // const titledData = result.map(item => {
    //         //     const final =[]
    //         //     const arr = data.purchases.map(t => t.date)
    //         //     const dataTitle = [...new Set(arr)]
    //         //     dataTitle.forEach(title => {
    //         //          title === item.data.date? [...final, title: {title}]




    //         //     })
    //         // })
    //         // console.log(2, titledData)
    //         const sortedResult = result.slice().sort((a, b) => {
    //             a = new Date(a.date);
    //             b = new Date(b.date);
    //             return a > b ? -1 : a < b ? 1 : 0;
    //         })
    //         setData(sortedResult)
    //     })
    // }, [])
    const navigate = (screen, info) => { navigation.navigate(screen, info) }
    // const [data, setData] = useState([])
    return (
        <SafeAreaView style={{ flex: 1, }} >
            {/* <LinearGradient colors={['#9484DE', '#49036C']}
                style={{ flex: 1 }} > */}
            <Text></Text>
            <FlatList
                data={salesHistory}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return <Group navigate={navigate} {...item} />

                }}
            />
            <View style={{ height: 40 }}></View>
            <AddButton navigation={navigation} route={"Add"} />
            {/* </LinearGradient> */}

        </SafeAreaView>
    );

}
const mapSalesHistoryToProps = state => {
    return { salesHistory: state.salesHistory }
}

export default connect(mapSalesHistoryToProps)(SalesListScreen)

// styles___________________________________________


const GroupTitle = styled.Text`
            font-weight: bold
            font-size : 22px
            color : #000000
             padding: 0 20px
  `