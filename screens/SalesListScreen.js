import React, { useState, useEffect } from 'react'
import { Text, View, Animated, TouchableOpacity, Dimensions, Modal, Button } from 'react-native';
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import RootContainer from "../components/RootContainer"
import Group from "../components/Group"
import AddButton from '../components/AddButton'
import { connect, useDispatch } from "react-redux"
import { FlatList, ScrollView } from 'react-native-gesture-handler';



const SalesListScreen = ({ salesHistory, navigation, soldProducts }) => {

    const dispatch = useDispatch()
    const navigate = (screen, info) => { navigation.navigate(screen, info) }
    const [visible, setVisible] = useState(false)
    console.log(soldProducts)

    return (<View style={{ flex: 1 }}>
        <RootContainer
            title='Journal'
        // headerComponent={<HeaderComponent />}
        >
            {/* 
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <View style={{ flex: 1, marginTop: 50, backgroundColor: "white" }}>
                    <Button title="hide" onPress={() => setVisible(false)} />

                </View>

            </Modal>
            <Button title="open" onPress={() => setVisible(true)} /> */}
            <FlatList
                data={salesHistory}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => {
                    return <Group navigate={navigate} {...item} />

                }}
            />

        </RootContainer>

        <AddButton onPress={() => navigation.navigate("Add")} />

    </View>

    );

}
const mapSalesHistoryToProps = state => {
    return {
        salesHistory: state.salesHistory,
        soldProducts: state.soldProducts
    }
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