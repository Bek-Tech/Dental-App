import React, { useState, useEffect } from 'react'
import { SectionList, Text } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'
import Group from "../components/Group"
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from "react-navigation"

export default function PatientList({ navigation }) {
    const [data, setData] = useState([])
    // const fetchData = async () => {
    //     await fetch('https://my-json-server.typicode.com/Bek-Tech/fakeJson/data').then((res) => res.json()).then((data) => {
    //         const result = data.purchases.map(item => ({
    //             data: {
    //                 ...item,
    //                 customer: data.customers.filter(user => user.user_id === item._id)[0]
    //             }
    //         }))
    //         const sortedResult = result.slice().sort((a, b) => {
    //             a = new Date(a.date);
    //             b = new Date(b.date);
    //             return a > b ? -1 : a < b ? 1 : 0;
    //         })
    //         setData(sortedResult)
    //     })

    // }
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/Bek-Tech/fakeJson/data').then((res) => res.json()).then((data) => {
            const result = data.purchases.map(item => ({
                data: {
                    ...item,
                    customer: data.customers.filter(user => user.user_id === item._id)[0]
                }
            }))

            // const titledData = result.map(item => {
            //     const final =[]
            //     const arr = data.purchases.map(t => t.date)
            //     const dataTitle = [...new Set(arr)]
            //     dataTitle.forEach(title => {
            //          title === item.data.date? [...final, title: {title}]




            //     })
            // })
            // console.log(2, titledData)
            const sortedResult = result.slice().sort((a, b) => {
                a = new Date(a.date);
                b = new Date(b.date);
                return a > b ? -1 : a < b ? 1 : 0;
            })
            setData(sortedResult)
        })
    }, [])
    const navigate = (screen, info) => { navigation.navigate(screen, info) }

    return (
        <Container>
            {/* <NavigationEvents onWillFocus={fetchData} /> */}
            <LinearGradient colors={['#9484DE', '#49036C']}
                style={{ flex: 1 }} >
                <FlatList
                    data={data}
                    keyExtractor={item => item.data._id}
                    renderItem={({ item }) => {
                        return <Group navigate={navigate} {...item} />
                    }}
                />
                {/* <SectionList
                    sections={data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <Group navigate={navigate} {...item} />}
                    renderSectionHeader={({ section: { date } }) => (
                        <GroupTitle>{date} </GroupTitle>
                    )}
                /> */}
                <AddButton onPress={() => navigation.navigate('Details')}>
                    <Ionicons name="ios-add" size={35} color="#fff" />
                </AddButton>
            </LinearGradient>
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