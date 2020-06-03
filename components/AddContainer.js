import React, { useState } from 'react'
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Dimensions, ImageBackground, ScrollView } from 'react-native';
import styled from 'styled-components/native'


const RootContainer = ({ children, title, head }) => {

    const [state, setState] = useState(Dimensions.get('window').height / 1.3)



    return (


        <BodyContainer>
            <ImageBackground source={require("../assets/background.jpg")}
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center"
                }}>
                <Text style={{ fontSize: 22, marginTop: 30 }}>{title}</Text>
                <KeyboardAvoidingView
                    // behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView>
                        {head}
                        <ItemsContainer

                        >
                            {children}
                        </ItemsContainer>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </BodyContainer>

    )


}

export default RootContainer


const ItemsContainer = styled.View`
     
    flex:1
    resizeMode: cover
     backgroundColor: rgba(255,255,255,0.4)
     borderRadius: 35px            
     margin: 5px  
     marginTop: 10px
     margin-bottom: 60px             
     padding: 15px   15px     
       shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
            shadow-opacity: 0.5
            shadow-radius: 6.3px
            elevation: 10   
`

const BodyContainer = styled.View`
flex: 1

`
