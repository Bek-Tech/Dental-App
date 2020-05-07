import React from 'react'
import { connect } from "react-redux"
import { Text, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Button from '../components/Button'
import { Ionicons, Foundation } from '@expo/vector-icons'
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const DetailsScreen = ({ navigation, salesHistory, customers }) => {
    const CustomerName = navigation.getParam('customer')

    const purchaseData = salesHistory.filter(item => item.customer === CustomerName)

    const customer = customers.filter(item => item.userName === CustomerName)


    return (
        <LinearGradient colors={['#9484DE', '#49036C']}
            style={{ flex: 1 }} >
            <Container>
                <Name>{customer[0].userName}</Name>
                <GrayText>{customer[0].phone}</GrayText>
                <RowDiv>
                    <Button
                        title={"Button"}
                        style={{
                            shadowOpacity: 0.5,
                            shadowRadius: 6.3,
                            elevation: 10
                        }} color={"#4294ff"}
                        action={() => navigation.navigate('PatientList')} />
                    <CallButton onPress={() => navigation.navigate('Details')}>
                        <Ionicons name="md-call" size={30} color="#fff" />
                    </CallButton>
                </RowDiv>
            </Container>
            <HistoryDiv>
                <Text>Purchase History</Text>
                <RowDiv>
                    <RowLeftView>
                        <Foundation name="clipboard-notes" size={24} color="#000" />
                        <LabelText>Product Name </LabelText>
                    </RowLeftView>
                    <RowRightView>
                        <Ionicons name="ios-calculator" size={24} color="#000" />
                        <LabelText>Quantity </LabelText>
                    </RowRightView>
                </RowDiv>

                <FlatList
                    data={purchaseData}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return <DateView>
                            <Text>{item.date}</Text>
                            {item.product.map(item => {
                                return <RowDiv>
                                    <RowLeftView>
                                        <BoldText>{item.name}</BoldText>
                                    </RowLeftView>
                                    <RowRightView>
                                        <BoldText>{item.amount}</BoldText>
                                    </RowRightView>
                                </RowDiv>

                            })}


                        </DateView>


                    }}
                />


            </HistoryDiv>

        </LinearGradient>

    )
}

const mapCustomersSalesHistoryToProps = state => {
    return {
        salesHistory: state.salesHistory,
        customers: state.customers
    }
}
export default connect(mapCustomersSalesHistoryToProps)(DetailsScreen)


// styles ___________________________________
const DateView = styled.View`
    justify-content: center
     align-items: center
    width: 300px
`

const HistoryDiv = styled.View`
flex: 1
align-Items: flex-start
padding: 25px 
margin: 5px 20px
background : #fff
border-radius : 25px
shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const LabelText = styled.Text`
font-size: 16px
margin-left: 10px
`
const BoldText = styled.Text`
font-size : 16px
font-weight: bold,
margin-left : 3px
`

const CallButton = styled.TouchableOpacity`

align-items:center
justify-content: center
border-radius: 50px
width: 45px
height: 45px
background: #4CBE2E
shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`
const RowLeftView = styled.View`

${'' /* border-left-width:2px */}
border-color: gray
width: 150px
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowRightView = styled.View`
${'' /* border-right-width:2px */}
border-left-width:2px
border-color: gray
width: 150px
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowDiv = styled.View`
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-evenly
align-items: center

`


const Name = styled.Text`
font-weight : 800
font-size : 28px
line-height : 30px
margin-bottom: 5px

`

const Container = styled.View`
padding: 25px 
margin: 5px 20px
background : #fff
border-radius : 25px
shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const GrayText = styled.Text`
 color : #8b979f
 margin-bottom: 5px
`