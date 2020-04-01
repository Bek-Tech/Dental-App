import React from 'react'
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Button from '../components/Button'
import { Ionicons } from '@expo/vector-icons'

const DetailsScreen = ({ navigation }) => {


    DetailsScreen.navigationOptions = {
        title: "Details",
        headerStyle: {
            backgroundColor: '#9484DE'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    return (
        <LinearGradient colors={['#9484DE', '#49036C']}
            style={{ flex: 1 }} >
            <Container>
                <Name>Customer Name</Name>
                <GrayText>+1 *** *** ** **</GrayText>
                <ButtonDiv>
                    <Button style={{
                        shadowOpacity: 0.5,
                        shadowRadius: 6.3,
                        elevation: 10
                    }} color={"#4294ff"} action={() => navigation.navigate('PatientList')} />
                    <CallButton onPress={() => navigation.navigate('Details')}>
                        <Ionicons name="md-call" size={30} color="#fff" />
                    </CallButton>
                </ButtonDiv>

            </Container>
        </LinearGradient>

    )
}
export default DetailsScreen


// styles ___________________________________

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

const ButtonDiv = styled.View`
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
margin: 20px
${'' /* flex: 1 */}
background : #fff
border-radius : 25px
`

const GrayText = styled.Text`
 color : #8b979f
 margin-bottom: 5px
`