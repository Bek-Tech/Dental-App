import React, { useState, useEffect } from 'react'
import { Text, View, Animated, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import RootContainer from "../components/RootContainer"
import Group from "../components/Group"
import AddButton from '../components/AddButton'
import { connect, useDispatch } from "react-redux"
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { fetchSales, insertSales } from "../DataBase/salesDB"
import { addSales } from "../actions/salesActions"


const SalesListScreen = ({ salesHistory, navigation }) => {

    const dispatch = useDispatch()
    const navigate = (screen, info) => { navigation.navigate(screen, info) }

    useEffect(() => {
        fetchSales()
            .then((result) => {
                const data = result.rows._array.map(item => {

                    const parsedProducts = JSON.parse(item.products)
                    return { ...item, products: parsedProducts }
                })

                dispatch(addSales(data))
            })
            .catch(err => {
                console.log('fetching failed.');
                console.log(err);
            });
    }, [])



    return (<View style={{ flex: 1 }}>
        <RootContainer
            title='Journal'
        // headerComponent={<HeaderComponent />}
        >
            <FlatList
                data={salesHistory}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => {
                    return <Group navigate={navigate} {...item} />

                }}
            />

        </RootContainer>

        <AddButton navigation={navigation} route="Add" />

    </View>

    );

}
const mapSalesHistoryToProps = state => {
    return { salesHistory: state.salesHistory }
}

export default connect(mapSalesHistoryToProps)(SalesListScreen)

// styles___________________________________________
const ListContainer = styled.View`
     flex: 1
     backgroundColor: white
     borderRadius: 35px            
     margin: 0px               
     padding: 15px   0px        
`

const BodyContainer = styled.View`
flex: 1
backgroundColor: black
`

// const HeaderView = styled.View`
// height: ${windowHeight / 3}
//    flex: 1
//                     justifyContent: center
// `


const GroupTitle = styled.Text`
            font-weight: bold
            font-size : 22px
            color : #000000
             padding: 0 20px
  `