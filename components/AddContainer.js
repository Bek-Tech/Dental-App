import React, { useState } from 'react'
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Dimensions, ImageBackground, ScrollView } from 'react-native';
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as colors from "./Colors"
import { LinearGradient } from 'expo-linear-gradient';



const AddContainer = ({ children, title, head, BackButton }) => {

    const [state, setState] = useState(Dimensions.get('window').height / 1.3)



    return (
        // <ImageBackground source={require("../assets/background.jpg")}
        //     style={{
        //         flex: 1,
        //         resizeMode: "cover",
        //         justifyContent: "center"
        //     }}>
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.bodyColor
            }}
        >
            <BodyContainer>

                <RowDiv>
                    <TouchableOpacity onPress={BackButton}>
                        <AntDesign name="arrowleft" size={24} color={colors.secondaryColor} />
                    </TouchableOpacity>
                    <TitleText>  {title}</TitleText>
                </RowDiv>

                <KeyboardAvoidingView
                    // behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        scrollEnabled={false}
                        style={{ flex: 1 }}>
                        {head}
                        <ItemsContainer

                        >
                            <LinearGradient
                                colors={[colors.secondaryColor, colors.mainColor,]}
                                style={{
                                    flex: 1,
                                    borderRadius: 35,
                                    margin: 10,
                                    marginTop: 15,
                                    padding: 10
                                }}
                            >
                                {children}
                            </LinearGradient>
                        </ItemsContainer>
                    </ScrollView>
                </KeyboardAvoidingView>

            </BodyContainer>
        </SafeAreaView>
        // </ImageBackground >
    )


}

export default AddContainer

const TitleText = styled.Text`
    fontSize: 30px
    font-weight: bold
    color: ${colors.secondaryColor}

`


const ItemsContainer = styled.View`
     
    flex:1
    resizeMode: cover
    overflow: hidden
    backgroundColor: ${colors.bodyColor}
     borderRadius: 35px            
     margin: 5px  
     marginTop: 10px
           
     padding: 5px   15px     
       shadow-color: #000
shadow-offset: {width: 0, height: 2}
            shadow-opacity: 0.5
            shadow-radius: 6.3px
            elevation: 10   
`

const BodyContainer = styled.View`
flex: 1

`
const RowDiv = styled.View`
            width: 100%
            ${'' /* borderColor: black
            borderWidth: 2px */}
            margin: 5px
            padding: 5px
            flex-direction: row
            justify-content: flex-start
            align-items: center
            `
