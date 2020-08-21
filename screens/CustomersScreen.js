import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { connect, useDispatch } from "react-redux"
import RootContainer from "../components/RootContainer"
import CustomerInfo from "../components/CustomerInfo"


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;



const CustomersScreen = ({ navigation, customers }) => {

    const [empty, setEmpty] = useState(false)
    return (<RootContainer
        backToTopButton={customers.length > 6 ? true : false}
        title="Customers"
        addButton={() => navigation.navigate("AddCustomer")}
        navigation={navigation}
        totalsData={{ name: "Customers", amount: customers.length }}
    >
        {customers.length > 0 ?
            customers.map(item => {
                return <CustomerInfo
                    key={item.id}
                    navigation={navigation}  {...item}
                />
            }) :
            <EmptyListDiv>
                <EmptyText>List Empty</EmptyText>
            </EmptyListDiv>
        }


    </RootContainer>

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



const EmptyListDiv = styled.View`
flex:1
height: ${windowHeight / 2.5}px
align-items:center
justify-content: center
`

const EmptyText = styled.Text`
font-size: 18px
`