import React, { useState } from 'react'
import { Text, View, Animated, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import styled from 'styled-components/native'
import { ScrollView } from 'react-native-gesture-handler';
import { LineChart } from "react-native-chart-kit";

const RootContainer = ({ children, title, headerComponent }) => {


    const [chart, setChart] = useState(true)

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;


    let TEXT_MAX_SIZE = 30

    const AnimationY = new Animated.Value(0)

    const scrollTextSize = AnimationY.interpolate({
        inputRange: [0, TEXT_MAX_SIZE],
        outputRange: [TEXT_MAX_SIZE, 0]
    })
    const scrollHeaderHeight = AnimationY.interpolate({
        inputRange: [0, windowHeight / 7],
        outputRange: [windowHeight / 7, 0]
    })

    const scrollHeaderWidth = AnimationY.interpolate({
        inputRange: [0, windowWidth - 50],
        outputRange: [windowWidth - 50, 0]
    })

    const scrollButtonSize = AnimationY.interpolate({
        inputRange: [0, 60],
        outputRange: [60, 0]
    })
    return (
        // <SafeAreaView style={{ flex: 1, }} >

        <BodyContainer>
            <ImageBackground source={require("../assets/background.jpg")}
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center"
                }}>
                <ScrollView
                    style={{ flex: 1 }}
                    scrollEventThrottle={50}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: AnimationY } } }]
                    )}
                    onMomentumScrollBegin={() => { }}
                    onMomentumScrollEnd={() => { }}
                >

                    <View style={{
                        height: windowHeight / 2.7,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                        <Animated.Text style={{
                            color: 'white',
                            fontSize: scrollTextSize
                        }}>{title}</Animated.Text>
                        {/* <Animated.View style={{

                            borderRadius: 25,
                            justifyContent: 'center',
                            height: scrollHeaderHeight,
                            width: scrollHeaderWidth,
                            backgroundColor: "rgba(255,255,255,0.4)"
                        }}> */}
                        {chart ? <View>
                            <LineChart
                                data={{
                                    labels: ["January", "February", "March", "April", "May", "June", "july", " august", "september", "oktober"],
                                    datasets: [
                                        {
                                            data: [
                                                Math.random() * 100, 44, 55, 22, 4, 64, 73, 23, 44, 10
                                            ]
                                        }
                                    ]
                                }}
                                width={windowWidth - 20}
                                height={windowHeight / 7}
                                yAxisLabel=""
                                yAxisSuffix=""
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "black",
                                    backgroundGradientFrom: "grey",
                                    backgroundGradientTo: "black",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "3",
                                        strokeWidth: "2",
                                        stroke: "white"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </View> : null}

                        {/* </Animated.View> */}

                    </View>
                    <ListContainer>
                        {children}
                    </ListContainer>

                </ScrollView>
            </ImageBackground>
        </BodyContainer>

    )


}

export default RootContainer


const ListContainer = styled.View`
     flex: 1
    
     backgroundColor: rgba(255,255,255,0.4)
     borderRadius: 35px            
     margin: 5px  
     margin-bottom: 60px             
     padding: 15px   0px     
       shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
            shadow-opacity: 0.5
            shadow-radius: 6.3px
            elevation: 10   
`

const BodyContainer = styled.View`
flex: 1

`


















