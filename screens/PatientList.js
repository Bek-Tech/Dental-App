import React, { useState, useEffect } from 'react'
import { SectionList } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'
import Group from "../components/Group"
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

export default function PatientList({ navigation }) {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('https://my-json-server.typicode.com/Bek-Tech/fakeJson/data').then(({ data }) => {
            console.log(data)
            const result = data.Purchases.map(item => ({
                ...item,
                customer: data.customers.filter(user => user._id === item.user_id)[0]
            }))
            console.log(result)
            setData(result)
        })
    }, [])


    const navigate = (screen, data) => { navigation.navigate(screen, data) }
    return (
        <Container>
            {/* <LinearGradient colors={['#9484DE', '#49036C']}
                style={{ flex: 1 }} >

                <SectionList
                    sections={state}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => <Group navigate={navigate} {...item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <GroupTitle>{title} </GroupTitle>
                    )}
                />
                <AddButton onPress={() => navigation.navigate('Details')}>
                    <Ionicons name="ios-add" size={35} color="#fff" />
                </AddButton>
            </LinearGradient> */}
        </Container>
    );
}




// styles___________________________________________

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

const Container = styled.SafeAreaView`
         flex:1
        ${'' /* marginTop: 50px  */}
      `

const GroupTitle = styled.Text`
font-weight: bold
font-size : 22px
color : #000000
 padding: 0 20px
  `