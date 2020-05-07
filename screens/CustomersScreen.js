import React from 'react'
import { Text, } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { connect } from "react-redux"
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'

const CustomersScreen = ({ navigation, customers }) => {
    console.log(customers)
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <LinearGradient colors={['#9484DE', '#49036C']}
                style={{ flex: 1 }} >
                <Text>Customers</Text>
                <FlatList
                    data={customers}
                    key={item => item.user_id}
                    renderItem={({ item }) => {
                        return <Text>{item.userName}</Text>



                    }}
                />
                <AddButton onPress={() => navigation.navigate('AddCustomer')}>
                    <Ionicons name="ios-add" size={35} color="#fff" />
                </AddButton>
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


const AddButton = styled.TouchableOpacity`

align-items:center
justify-content: center
border-radius: 50px
width: 64px
height: 64px
background: #4294ff
position: absolute
right: 25px
bottom: 25px
shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`