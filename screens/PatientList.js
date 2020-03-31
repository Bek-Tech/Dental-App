import React from 'react'
import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native
import { LinearGradient } from 'expo-linear-gradient'
import Group from "../components/Group"
import { Ionicons } from '@expo/vector-icons'

export default function PatientList() {

    const state = [
        {
            title: "14 september",
            data: [
                {
                    id: 2324,

                    userName: "user name",
                    purpose: "purpose of meeting",
                    userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
                    time: "12:30"
                },
                {
                    id: 2334,
                    userName: "user name",
                    purpose: "purpose of meeting",
                    userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
                    time: "13:30"
                }
            ]

        },
        {
            title: "15 september",
            data: [
                {
                    id: 2324,

                    userName: "user name",
                    purpose: "purpose of meeting",
                    userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
                    time: "12:30"
                },
                {
                    id: 2334,
                    userName: "user name",
                    purpose: "purpose of meeting",
                    userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
                    time: "13:30"
                }
            ]
        }, {
            title: "14 september",
            data: [
                {
                    id: 2324,

                    userName: "user name",
                    purpose: "purpose of meeting",
                    userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
                    time: "12:30"
                },
                {
                    id: 2334,
                    userName: "user name",
                    purpose: "purpose of meeting",
                    userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
                    time: "13:30"
                }
            ]

        },
        {
            title: "15 september",
            data: [
                {
                    id: 2324,

                    userName: "user name",
                    purpose: "purpose of meeting",
                    userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
                    time: "12:30"
                },
                {
                    id: 2334,
                    userName: "user name",
                    purpose: "purpose of meeting",
                    userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
                    time: "13:30"
                }
            ]
        }, {
            title: "14 september",
            data: [
                {
                    id: 2324,

                    userName: "user name",
                    purpose: "purpose of meeting",
                    userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
                    time: "12:30"
                },
                {
                    id: 2334,
                    userName: "user name",
                    purpose: "purpose of meeting",
                    userImg: "https://image.shutterstock.com/image-photo/happy-millennial-content-maker-shooting-600w-1633410118.jpg",
                    time: "13:30"
                }
            ]

        }
    ]

    return (
        <Container forceInset={{ top: 'always' }}>
            <LinearGradient colors={['#9484DE', '#49036C']}
                style={{ flex: 1 }} >

                <SectionList
                    sections={state}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => <Group {...item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <GroupTitle>{title} </GroupTitle>
                    )}
                />
                <AddButton>
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
        marginTop: 50px 
      `

const GroupTitle = styled.Text`
font-weight: bold
font-size : 22px
color : #000000
 padding: 0 20px
  `