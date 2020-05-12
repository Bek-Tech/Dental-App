import React, { useState, useEffect, Component } from 'react'
import { Text, View, Animated, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'
import Group from "../components/Group"
import AddButton from '../components/AddButton'
import { connect } from "react-redux"
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { insertSales, deleteSale, fetchSales } from "../DataBase/db"   // insertSales( date, userImg, customer , products)


const SalesListScreen = ({ salesHistory, navigation }) => {
    const windowHeight = Dimensions.get('window').height;
    //_________________________________________________
    const [state, setState] = useState([])
    // const date = JSON.stringify(new Date())
    // const userImg = "https://source.unsplash.com/random/100x100?face"
    // const customer = "delete me"
    // const product = JSON.stringify([{ name: "apple", quantity: 55 }])

    // insertSales(date, userImg, customer, product)
    //     .then(() => {
    //         console.log('data inserted');
    //     })
    //     .catch(err => {
    //         console.log(' insertion failed.');
    //         console.log(err);
    //     });

    //  deleteSale()
    //     .then(() => {
    //         console.log('data inserted');
    //     })
    //     .catch(err => {
    //         console.log(' insertion failed.');
    //         console.log(err);
    //     });
    useEffect(() => {
        fetchSales()
            .then((result) => {
                setState(result.rows._array)
                console.log('data fetched');
            })
            .catch(err => {
                console.log('fetching failed.');
                console.log(err);
            });
    }, [])


    //______________________________________________
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

                <View style={{
                    height: windowHeight / 3,
                    flex: 1,
                    justifyContent: "center"
                }} >
                    <Animated.Text style={{
                        color: 'white',
                        fontSize: scrollTextSize
                    }}>Journal</Animated.Text>
                </View>
                <ListContainer>
                    {/* ____________________________________________ */}
                    {state.map(item => {
                        const parsed = JSON.parse(item.products)
                        return <View>
                            <Text>{item.customer}</Text>
                            <Text>{item.date}</Text>
                            {parsed.map(product => {
                                return <View>
                                    <Text>{product.name}</Text>
                                    <Text>{product.quantity}</Text>
                                </View>
                            })}


                        </View>

                    }

                    )}
                    {/* ____________________________________________ */}
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