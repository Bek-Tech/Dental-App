import React from 'react'
import { Text, Linking } from 'react-native';
import styled from 'styled-components/native'
import Button from './Button'
import { Ionicons } from '@expo/vector-icons'

const CustomerInfo = (props) => {
    const { navigation, userName, phone } = props
    return <Container>
        <Name>{userName}</Name>
        <GrayText>{phone}</GrayText>
        <RowDiv>
            <Button
                title={"Button"}
                style={{
                    shadowOpacity: 0.5,
                    shadowRadius: 6.3,
                    elevation: 10
                }} color={"#4294ff"}
                action={() => navigation.navigate('AddCustomer')} />
            <CallButton onPress={() => Linking.openURL(`tel: ${phone}`)} >
                <Ionicons name="md-call" size={30} color="#fff" />
            </CallButton>
        </RowDiv>
    </Container>
}




export default CustomerInfo




const Container = styled.View`
padding: 15px 
margin: 5px 20px
background : rgba(157,240,227,0.2)
border-radius : 25px
${'' /* shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10 */}
`

const GrayText = styled.Text`
 color : #8b979f
 margin-bottom: 5px
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