import React, { useState, useRef, useEffect } from 'react'
import { Text, View, Animated, TouchableOpacity, Dimensions, ImageBackground, StyleSheet, ScrollView, Button } from 'react-native';
import styled from 'styled-components/native'
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Entypo, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import ModalTrashBox from './ModalTrashBox'
import { LinearGradient } from 'expo-linear-gradient';
import * as colors from "./Colors"
import { connect, useDispatch } from "react-redux"
import { LineChart } from "react-native-chart-kit";


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;





const RootContainer = ({ children, title, addButton, navigation, totalOperations, products, customers, soldProducts, salesHistory, totalsData }) => {

    const [handleScroll, setHandleScroll] = useState(false)
    const [showTrashBox, setShowTrashBox] = useState(false)
    const [salesChartData, setSalesChartData] = useState([{ label: 'no data', amount: 0 }])


    const AnimationY = useRef(new Animated.Value(0)).current
    const resizeAnim = useRef(new Animated.Value(0)).current
    const animOpacity = useRef(new Animated.Value(0)).current
    const resizeHeader = useRef(new Animated.Value(0)).current
    const resizeRadius = useRef(new Animated.Value(0)).current
    const resizeAddButton = useRef(new Animated.Value(0)).current
    const topAddButton = useRef(new Animated.Value(0)).current
    const rightAddButton = useRef(new Animated.Value(0)).current
    const resizeButton = useRef(new Animated.Value(0)).current
    const animatedHeaderHeight = useRef(new Animated.Value(0)).current
    const scrollViewRef = useRef()






    useEffect(() => {


        // ________________calculating data for chart

        const monthsArr = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dek"]


        const monthsObj = { Jan: { total: 0, data: [] }, Feb: { total: 0, data: [] }, March: { total: 0, data: [] }, Apr: { total: 0, data: [] }, May: { total: 0, data: [] }, Jun: { total: 0, data: [] }, "Jul": { total: 0, data: [] }, Aug: { total: 0, data: [] }, "Sep": { total: 0, data: [] }, "Okt": { total: 0, data: [] }, "Nov": { total: 0, data: [] }, "Dek": { total: 0, data: [] } }


        const customersObj = {}

        const currentDate = new Date()
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()
        const lastSixMonths = []


        for (let i = currentMonth; currentMonth - 6 >= 0 ? i > currentMonth - 6 : i >= 0; i--) {
            lastSixMonths.unshift(monthsArr[i])
        }



        salesHistory.forEach(item => {
            monthsObj[monthsArr[item.month]].data.push(item)
            const totalAmount = item.productsArr.reduce((acc, item) => {
                return acc + item.quantity
            }, 0)
            monthsObj[monthsArr[item.month]].total = monthsObj[monthsArr[item.month]].total + totalAmount
            customersObj[item.customerId] ? null : customersObj[item.customerId] = { data: [], totalPurchased: 0 }
            customersObj[item.customerId].data.push(item)
            customersObj[item.customerId].totalPurchased = customersObj[item.customerId].totalPurchased + totalAmount
        })

        const datasetArr = lastSixMonths.map((item, index) => {

            return {
                label: item,
                amount: monthsObj[item].total
            }
        })

        setSalesChartData(datasetArr)




    }, [salesHistory.length])









    const fadeAnimOut = (new Animated.Value(1))

    handleScroll ?
        Animated.add(
            Animated.timing(
                animatedHeaderHeight,
                {
                    toValue: 60,
                    duration: 700,
                }
            ).start(() => {
                Animated.timing(
                    animOpacity,
                    {
                        toValue: 1,
                        duration: 500,
                    }
                ).start(() => {
                    Animated.timing(
                        resizeButton,
                        {
                            toValue: 38,
                            duration: 500,
                        }
                    ).start()
                })
            }),

            Animated.timing(
                resizeAnim,
                {
                    toValue: 0,
                    duration: 500,
                }
            ).start(),
            Animated.timing(
                resizeAddButton,
                {
                    toValue: 100,
                    duration: 500,
                }
            ).start(),
            Animated.timing(
                rightAddButton,
                {
                    toValue: 0,
                    duration: 1000,
                }
            ).start(),
            Animated.timing(
                topAddButton,
                {
                    toValue: 10,
                    duration: 500,
                }
            ).start(),

            Animated.timing(
                resizeRadius,
                {
                    toValue: 0,
                    duration: 300,
                }
            ).start(),
            Animated.timing(resizeHeader,
                {
                    toValue: 0,
                    duration: 700,
                }
            ).start()


        )
        : Animated.add(
            Animated.timing(
                animatedHeaderHeight,
                {
                    toValue: 0,
                    duration: 500,
                }
            ).start(),
            Animated.timing(
                animOpacity,
                {
                    toValue: 0,
                    duration: 1000,
                }
            ).start(),
            Animated.timing(resizeHeader,
                {
                    toValue: 300,
                    duration: 1000,
                }
            ).start(),
            Animated.timing(resizeRadius,
                {
                    toValue: windowWidth,
                    duration: 1200,
                }
            ).start()
            ,
            Animated.timing(resizeAnim,
                {
                    toValue: 100,
                    duration: 800,
                }
            ).start(),
            Animated.timing(
                resizeAddButton,
                {
                    toValue: 150,
                    duration: 700,
                }
            ).start(),
            Animated.timing(
                topAddButton,
                {
                    toValue: 100,
                    duration: 500,
                }
            ).start(),
            Animated.timing(
                rightAddButton,
                {
                    toValue: 0,
                    duration: 1000,
                }
            ).start(),
            Animated.timing(
                resizeButton,
                {
                    toValue: 0,
                    duration: 1000,
                }
            ).start(),
            Animated.timing(
                resizeRadius,
                {
                    toValue: windowHeight,
                    duration: 500,
                }
            ).start()
        )

    const fadeOutTrigger = () => {
        Animated.timing(
            fadeAnimOut,
            {
                toValue: 0,
                duration: 1000,
            }
        ).start()
    }

    const fadeInTrigger = () => {
        Animated.timing(
            fadeAnimIn,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start()
    }

    const addButtonRight = AnimationY.interpolate({
        inputRange: [0, 50, 50000],
        outputRange: [50, 3, 3]
    })




    const addButtonTop = AnimationY.interpolate({
        inputRange: [0, 50, 290, 50000],
        outputRange: [240, 240, 12, 12]
    })

    const scrollTextSize = AnimationY.interpolate({
        inputRange: [0, 200, 300, 50000],
        outputRange: [50, 50, 30, 0],
        extrapolate: 'clamp'
    })

    const scrollTextDivWidth = AnimationY.interpolate({
        inputRange: [0, 100, 50000],
        outputRange: [windowWidth, (windowWidth / 3), (windowWidth / 3)]
    })
    const scrollHeaderButtonsDivWidth = AnimationY.interpolate({
        inputRange: [0, 100, 50000],
        outputRange: [0, 2 * (windowWidth / 4), 2 * (windowWidth / 4),]
    })

    const scrollOvalHeaderHeight = AnimationY.interpolate({
        inputRange: [0, 50, 380, 20000],
        outputRange: [350, 350, 0, 0]
    })

    const scrollHeaderRadius = AnimationY.interpolate({
        inputRange: [0, 200, 300, 90000],
        outputRange: [windowWidth, windowWidth, 0, 0]
    })

    const scrollHeaderChartHeight = AnimationY.interpolate({
        inputRange: [0, 50, 220, 10000],
        outputRange: [170, 170, 0, 0]
    })

    const scrollButtonSize = AnimationY.interpolate({
        inputRange: [0, 40, 150, 500000],
        outputRange: [60, 60, 0, 0]
    })
    const scrollButtonSizeReverse = AnimationY.interpolate({
        inputRange: [0, 100, 200, 50000],
        outputRange: [0, 0, 40, 40]
    })

    const scrollButtonOpacity = AnimationY.interpolate({
        inputRange: [0, 300, 400, 500000],
        outputRange: [1, 1, 0, 0]
    })

    const scrollToTopButtonOpacity = AnimationY.interpolate({
        inputRange: [0, 200, 300, 50000],
        outputRange: [0, 0, 1, 1]
    })







    return (
        <LinearGradient
            colors={[colors.secondaryColor, colors.mainColor,]}
            style={{
                flex: 1,
            }}
        >

            <SafeAreaView
                style={{ backgroundColor: handleScroll ? colors.mainColor : null, flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
            >


                <ModalTrashBox
                    showTrigger={() => setShowTrashBox(!showTrashBox)}
                    show={showTrashBox}
                />


                <BodyContainer>



                    {/* _______________ScrollView___________________________________________________ */}

                    <ScrollView
                        style={{
                            flex: 1,
                            paddingTop: 360,
                        }}
                        scrollEventThrottle={5}
                        ref={scrollViewRef}
                        onScroll={Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: {
                                        y: AnimationY
                                    }
                                }
                            }], {
                            listener: (event) => {
                                event.nativeEvent.contentOffset.y > 350 ?
                                    handleScroll ? null : setHandleScroll(true) :
                                    handleScroll ? setHandleScroll(false) : null
                            }
                        })
                        }
                    >

                        <ListContainer>
                            {children}
                        </ListContainer>

                        {handleScroll ?
                            <Animated.View style={{
                                height: 500,
                                width: "100%",
                                opacity: scrollToTopButtonOpacity,
                                alignItems: "center",
                                justifyContent: "flex-start"
                            }}>


                                <ScrollToTopButton onPress={() => scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })} >
                                    <Entypo name="arrow-bold-up" size={50} color="gray" />
                                </ScrollToTopButton>
                            </Animated.View>
                            :
                            <View style={{ height: 350, }}><Text>.</Text></View>}


                    </ScrollView>



                    {/* ___________________________________________oval header____________________________________________________________ */}

                    <Animated.View style={{
                        ...styles.headerContainerStyle,
                        height: scrollOvalHeaderHeight,

                    }} >


                        <Animated.View style={{
                            ...styles.ovalHeaderContainer,
                            borderRadius: scrollHeaderRadius

                        }} >

                            <View style={styles.headerItem}>
                                <LinearGradient
                                    colors={[colors.secondaryColor, colors.mainColor,]}
                                    style={{
                                        flex: 1,
                                        justifyContent: "space-between",
                                        paddingBottom: 35
                                    }}
                                >
                                    <RowDiv>



                                    </RowDiv>

                                    {/* __________________________________________________________________ search  */}
                                    {/* <View style={{
                                        width: windowWidth / 1.2,
                                        height: 60,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        backgroundColor: "black",
                                        opacity: 0.4,
                                        borderRadius: 30,
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }}>
                                        <TextInput placeholder="search" style={{
                                            width: windowWidth / 1.3,
                                            height: 50,
                                        }} />
                                    </View> */}
                                    <RowDiv style={{ paddingLeft: 10 }}>
                                        <View style={{
                                            flex: 2,
                                            justifyContent: "center",
                                            alignItems: "flex-start"
                                            // borderColor: "black",
                                            // borderWidth: 2,
                                        }}>
                                            <Animated.Text style={{
                                                color: colors.bodyColor,
                                                fontSize: scrollTextSize,
                                                fontWeight: "bold",

                                            }}>{title}</Animated.Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", }}>

                                            <Animated.View
                                                style={{
                                                    ...styles.AnimatedButtonDiv,
                                                    height: 40,
                                                    width: 40,
                                                    opacity: scrollButtonOpacity
                                                }}
                                            >
                                                <CircleButton onPress={() => setShowTrashBox(true)}>
                                                    <FontAwesome5 name="trash" size={17} color={colors.iconColor} />
                                                </CircleButton>
                                            </Animated.View>
                                            <Animated.View
                                                style={{
                                                    ...styles.AnimatedButtonDiv,
                                                    height: 40,
                                                    width: 40,
                                                    opacity: scrollButtonOpacity
                                                }}
                                            >
                                                <CircleButton onPress={() => navigation.navigate("Charts")}>
                                                    <FontAwesome name="line-chart" size={17} color={colors.iconColor} />
                                                </CircleButton>
                                            </Animated.View>
                                            <Animated.View
                                                style={{
                                                    ...styles.AnimatedButtonDiv,
                                                    height: 40,
                                                    width: 40,
                                                }}
                                            >
                                                <CircleButton onPress={() => {
                                                    navigation.navigate("AddDelivery")
                                                }}>
                                                    <MaterialCommunityIcons name="truck-fast" size={23} color={colors.iconColor} />
                                                </CircleButton>
                                            </Animated.View>
                                        </View>

                                    </RowDiv>
                                    <Animated.View style={{
                                        height: scrollHeaderChartHeight,
                                        overflow: "hidden"
                                    }}>

                                        <LineChart
                                            data={{
                                                labels: salesChartData.map(item => item.label),
                                                datasets: [
                                                    {
                                                        data: salesChartData.map(item => item.amount)
                                                    }
                                                ]
                                            }}
                                            width={windowWidth}
                                            height={170}
                                            yAxisLabel=''
                                            yAxisSuffix=""
                                            yAxisInterval={1} // optional, defaults to 1
                                            chartConfig={{
                                                backgroundColor: "transparent",
                                                backgroundGradientFrom: colors.mainColor,
                                                backgroundGradientFromOpacity: 0,
                                                backgroundGradientTo: "transparent",
                                                backgroundGradientToOpacity: 0.5,
                                                decimalPlaces: 2, // optional, defaults to 2dp
                                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,

                                                propsForDots: {
                                                    r: "3",
                                                    strokeWidth: "2",
                                                    stroke: "white"
                                                }
                                            }}
                                            bezier
                                            style={{
                                                marginVertical: 0,
                                                borderRadius: 0
                                            }}
                                        />
                                    </Animated.View>
                                    <View style={{
                                        marginTop: 20,
                                        marginLeft: 30,
                                        width: 230,
                                        height: 30,
                                        justifyContent: "center"
                                    }}>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                            <Text style={{ margin: 10, fontSize: 14 }}>{totalsData.name} :</Text>
                                            <View style={{
                                                width: 90,
                                            }}>
                                                <Text style={{ fontSize: 14, color: "white" }}>{totalsData.amount}</Text>
                                            </View>

                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                            <Text style={{ fontSize: 14, margin: 10 }}>Total sales : </Text>
                                            <View style={{
                                                width: 90
                                            }}>
                                                <Text style={{ fontSize: 14, color: "white" }}>{soldProducts.totalSold}</Text>
                                            </View>
                                        </View>


                                    </View>
                                </LinearGradient>
                            </View>


                        </Animated.View>

                    </Animated.View>







                    {/* __________________________________header________________________________________________________ */}
                    <Animated.View style={{
                        ...styles.animatedHeader,
                        height: animatedHeaderHeight,
                        opacity: animOpacity
                    }}>
                        <HeaderRowDiv>
                            <Animated.View style={{

                                justifyContent: 'flex-start',
                                alignItems: "center"
                            }}>
                                <Animated.Text style={{
                                    color: colors.bodyColor,
                                    fontSize: 30,
                                    fontWeight: "bold"

                                }}>{title}</Animated.Text>
                            </Animated.View>
                            <Animated.View style={{
                                // borderWidth: 2,
                                // borderColor: "red",
                                flexDirection: 'row',
                                justifyContent: "flex-end",
                                width: 130
                            }}>

                                <Animated.View
                                    style={{
                                        ...styles.AnimatedButtonDiv,
                                        marginRight: 10,
                                        width: resizeButton,
                                        height: resizeButton,
                                    }}
                                >
                                    <CircleButton onPress={() => setShowTrashBox(true)}>
                                        <FontAwesome5 name="trash" size={13} color={colors.iconColor} />
                                    </CircleButton>
                                </Animated.View>
                                <Animated.View
                                    style={{
                                        ...styles.AnimatedButtonDiv,
                                        marginRight: 10,
                                        width: resizeButton,
                                        height: resizeButton,

                                    }}
                                >

                                    <CircleButton onPress={() => navigation.navigate("Charts")}>
                                        <FontAwesome name="line-chart" size={13} color={colors.iconColor} />
                                    </CircleButton>
                                </Animated.View>
                                <Animated.View
                                    style={{
                                        ...styles.AnimatedButtonDiv,
                                        width: resizeButton,
                                        height: resizeButton,
                                        // opacity: fadeAnimIn,
                                    }}
                                >
                                    <CircleButton onPress={() => navigation.navigate("AddDelivery")}>
                                        <MaterialCommunityIcons name="truck-fast" size={15} color={colors.iconColor} />
                                    </CircleButton>
                                </Animated.View>

                            </Animated.View>

                        </HeaderRowDiv>
                    </Animated.View>


                    {/* _______________________add button______________________________________________________ */}
                    <Animated.View style={{
                        ...styles.addButtonDiv,
                        width: resizeAddButton,
                        height: resizeAddButton,
                        right: rightAddButton,
                        top: addButtonTop
                    }}>
                        <CircleAddButton onPress={addButton}>
                            <Ionicons name="ios-add" size={70} color="white" />
                        </CircleAddButton>
                    </Animated.View>

                </BodyContainer>

            </SafeAreaView>
            {/* </ImageBackground > */}
        </LinearGradient>
    )
}

const mapStateToProps = state => {
    return {
        products: state.products,
        customers: state.customers,
        salesHistory: state.salesHistory.sales,
        soldProducts: state.salesHistory.productsSale
    }
}


export default connect(mapStateToProps)(RootContainer)

const styles = StyleSheet.create({
    addButtonDiv: {
        overflow: "hidden",
        position: "absolute",

    },
    animatedHeader: {
        width: "100%",
        position: "absolute",
        top: 0,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.mainColor
    },
    headerContainerStyle: {
        alignSelf: 'center',
        overflow: 'hidden',
        position: "absolute",
        top: 0,
        width: windowWidth,
    },
    ovalHeaderContainer: {
        height: windowHeight * 2,
        marginBottom: 15,
        justifyContent: "flex-start",
        alignItems: "baseline",
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        width: windowWidth * 2,
        marginLeft: -(windowWidth / 2),

    },
    headerItem: {
        flex: 1,
        width: windowWidth,
        position: 'absolute',
        bottom: 0,
        marginLeft: windowWidth / 2,
        justifyContent: "flex-start",
        alignItems: "baseline",

    },
    AnimatedButtonDiv: {
        overflow: "hidden",
        justifyContent: "center",
        justifyContent: "center",

    },

})

const ScrollToTopButton = styled.TouchableOpacity`
 align-items:center
 justify-content: center
 width: 120px
 height: 120px
 border-radius: 150px
 background: ${colors.mainColor}
 shadow-color: #000
 shadow-offset: {width: 0, height: 2}
 shadow-opacity: 0.5
 shadow-radius: 6.3px
 elevation: 10
 `


const ListContainer = styled.View`
  flex: 1 
  margin-bottom: 60px
  padding: 15px   0px
  shadow-color: #000
  shadow-opacity: 0.5
  shadow-radius: 6.3px
  elevation: 10
`

const BodyContainer = styled.View`
  flex: 1
  width: ${windowWidth}px
  backgroundColor: ${colors.bodyColor}

`
const CircleButton = styled.TouchableOpacity`
 flex: 1
 align-items:center
 justify-content: center
 border-radius: 50px
 background: black
 margin : 0px
 shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
 shadow-opacity: 0.5
 shadow-radius: 6.3px
 elevation: 10
 `
const HeaderRowDiv = styled.View`
     width: 100%
      padding-right: 100px
      padding-left: 10px
      flex-direction: row
      justify-content: space-between
      align-items: center
            
            `
const CircleAddButton = styled.TouchableOpacity`
 flex:1
 align-items:center
 justify-content: center
 margin: 15px
 border-radius: 100px
 background: ${colors.addButtonColor}
 shadow-color: #000
 shadow-opacity: 0.5
 shadow-radius: 6.3px
 elevation: 10
 `



const RowDiv = styled.View`
 marginTop: 30px
 width: 100%
 flex-direction: row
 justify-content: space-evenly
 align-items: center
   `

















