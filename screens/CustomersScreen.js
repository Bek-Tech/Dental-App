import React from 'react'
import { Text, View, ScrollView, Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { connect } from "react-redux"
import { FlatList } from 'react-native-gesture-handler';
import AddButton from '../components/AddButton'
import CustomerInfo from "../components/CustomerInfo"


const CustomersScreen = ({ navigation, customers }) => {
    const navigateToAddCustomer = () => navigation.navigate('AddCustomer')

    const windowHeight = Dimensions.get('window').height;

    let TEXT_MAX_SIZE = 60

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
        <BodyContainer>

            <ScrollView
                scrollEventThrottle={3}
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
                        fontSize: scrollTextSize,
                        color: "white",
                        margin: 15,
                    }}>Customers</Animated.Text>
                </View>


                <ListContainer>
                    <FlatList
                        data={customers}
                        key={item => item.user_id}
                        renderItem={({ item }) => {
                            return <CustomerInfo navigation={navigation}  {...item} />


                        }}
                    />

                </ListContainer>
                <View style={{ height: 60 }}></View>

            </ScrollView>
        </BodyContainer>
    )
}

const mapCustomersToProps = state => {
    return {
        customers: state.customers
    }

}

export default connect(mapCustomersToProps)(CustomersScreen)

//styles ___________________

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
