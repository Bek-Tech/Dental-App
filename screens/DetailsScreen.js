import React from 'react'
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Button from '../components/Button'


const DetailsScreen = ({ }) => {


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
                <Button title={"Button"} color={"#4294ff"} />
            </Container>
        </LinearGradient>

    )
}
export default DetailsScreen


// styles ___________________________________




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
`