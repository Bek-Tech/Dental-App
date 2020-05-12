import React from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'



const AddButton = ({ navigation, route }) => {
    return <AddButtonDiv onPress={() => navigation.navigate(route)}>
        {/* <Ionicons name="ios-add" size={35} color="#fff" /> */}
    </AddButtonDiv>
}





export default AddButton




const AddButtonDiv = styled.TouchableOpacity`
        
        align-items:center
        justify-content: center
        border-radius: 50px
      flex: 1
        background: #4294ff
        shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
            shadow-opacity: 0.5
            shadow-radius: 6.3px
            elevation: 10
            `