import React from 'react'
import { Text, View } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'
import { connect } from "react-redux"
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'
import AddButton from '../components/AddButton'
import CustomerInfo from "../components/CustomerInfo"

const CustomersScreen = ({ navigation, customers }) => {
    const navigateToAddCustomer = () => navigation.navigate('AddCustomer')
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <LinearGradient colors={['#9484DE', '#49036C']}
                style={{ flex: 1 }} >
                <Text>Customers</Text>
                <FlatList
                    data={customers}
                    key={item => item.user_id}
                    renderItem={({ item }) => {
                        return <CustomerInfo navigation={navigation}  {...item} />


                    }}
                />
                <View style={{ height: 45 }}></View>
                <AddButton navigation={navigation} route={"AddCustomer"} />
            </LinearGradient>
        </SafeAreaView>
    )
}

const mapCustomersToProps = state => {
    return {
        customers: state.customers
    }

}

export default connect(mapCustomersToProps)(CustomersScreen)
