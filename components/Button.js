import React from 'react'
import styled from 'styled-components/native'
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function Button({ title, color }) {
    return (
        <TouchableOpacity style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            backgroundColor: color,
            height: 45
        }}><ButtonText>{title}</ButtonText></TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {

    }

})

const ButtonText = styled.Text`
font-weight : 600
font-size : 18px
font-weight: bold
line-height : 33px
color : #fff
`

// const Button = styled.TouchableOpacity`
// justify-content: center
// align-items: center 
// border-radius: 30px
// background : #4294ff
// height: 45px
// `