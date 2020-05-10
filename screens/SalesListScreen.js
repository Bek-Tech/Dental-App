import React, { useState, useEffect, Component } from 'react'
import { Text, View, Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'
import Group from "../components/Group"
import AddButton from '../components/AddButton'
import { connect } from "react-redux"
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const SalesListScreen = ({ salesHistory, navigation }) => {

    let TEXT_MAX_SIZE = 60

    const navigate = (screen, info) => { navigation.navigate(screen, info) }
    const AnimationY = new Animated.Value(0)

    const scrollTextSize = AnimationY.interpolate({
        inputRange: [0, TEXT_MAX_SIZE],
        outputRange: [TEXT_MAX_SIZE, 0]
    })
    const scrollButtonSize = AnimationY.interpolate({
        inputRange: [0, 60],
        outputRange: [60, 0]
    })
    return (
        // <SafeAreaView style={{ flex: 1, }} >

        <BodyContainer>

            <ScrollView
                scrollEventThrottle={5}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: AnimationY } } }]
                )}
            >

                <HeaderView>
                    <Animated.Text style={{
                        fontSize: scrollTextSize,
                        color: "white",
                        margin: 15,
                    }}>Journal</Animated.Text>
                </HeaderView>
                <ListContainer>
                    <FlatList
                        data={salesHistory}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return <Group navigate={navigate} {...item} />

                        }}
                    />

                </ListContainer>
                <View style={{ height: 60 }}></View>
            </ScrollView>
            <Animated.View style={{
                position: "absolute",
                bottom: 65,
                right: 25,
                width: scrollButtonSize,
                height: scrollButtonSize,
                borderRadius: 25
            }}>
                <AddButton navigation={navigation} route="Add" />
            </Animated.View>

        </BodyContainer>



        // </SafeAreaView>
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

const HeaderView = styled.View`
height: 300px
   flex: 1
                    justifyContent: center
`


const GroupTitle = styled.Text`
            font-weight: bold
            font-size : 22px
            color : #000000
             padding: 0 20px
  `