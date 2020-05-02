import React from 'react'
import { connect } from "react-redux"
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Button from '../components/Button'
import { Ionicons, Foundation } from '@expo/vector-icons'
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const DetailsScreen = ({ navigation, purchases, customers }) => {

    const CustomerName = navigation.getParam('customer')

    const data = customers.filter(item => item.userName === CustomerName)


    return (
        <LinearGradient colors={['#9484DE', '#49036C']}
            style={{ flex: 1 }} >
            <Container>
                <Name>{data[0].userName}</Name>
                <GrayText>{data[0].phone}</GrayText>
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
                    <Foundation name="clipboard-notes" size={24} color="#000" />
                    <LabelText>Product Name :</LabelText>
                    <BoldText>Some Product</BoldText>
                </RowDiv>
                <RowDiv>
                    <Ionicons name="ios-calculator" size={24} color="#000" />
                    <LabelText>Quantity :</LabelText>
                    <BoldText>7777</BoldText>
                </RowDiv>
            </HistoryDiv>

        </LinearGradient>

    )
}

const mapCustomersPurchasesToProps = state => {
    return {
        purchases: state.purchases,
        customers: state.customers
    }
}
export default connect(mapCustomersPurchasesToProps)(DetailsScreen)


// styles ___________________________________

const HistoryDiv = styled.View`
align-Items: flex-start
padding: 25px 
margin: 5px 20px
${'' /* flex: 1 */}
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

const RowDiv = styled.View`
padding: 5px
flex-direction: row
justify-content: center
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
${'' /* flex: 1 */}
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