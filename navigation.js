import React from 'react';
import { Easing, Animated, Dimensions } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { fromLeft } from 'react-navigation-transitions'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoadingScreen from "./screens/LoadingScreen"
import SalesListScreen from './screens/SalesListScreen'
import DetailsScreen from './screens/DetailsScreen'
import AddScreen from './screens/AddScreen'
import AddCustomerScreen from './screens/AddCustomerScreen'
import AddProductScreen from './screens/AddProductScreen'
import CustomersScreen from './screens/CustomersScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import ProductsScreen from './screens/ProductsScreen'
import AddDeliveryScreen from './screens/AddDeliveryScreen'
import ChartsScreen from './screens/ChartsScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import { TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';

const MyTransition = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
        return {
            cardStyle: {
                opacity: current.progress,
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                        scale: current.progress.interpolate({
                            inputRange: [1, 1],
                            outputRange: [1, 0.5],
                        })


                    },

                    {
                        scale: next
                            ? next.progress.interpolate({
                                inputRange: [0, 0.3],
                                outputRange: [1, 0.9],
                            })
                            : 1,
                    },
                ],
            },
            overlayStyle: {
                opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                }),
            },
        };
    },
}



const RootNavigation = createSwitchNavigator({
    Loading: LoadingScreen,
    MainFlow: createStackNavigator({
        MainScreens: createBottomTabNavigator({
            Sales: createStackNavigator({
                SalesList: {
                    screen: SalesListScreen,
                    navigationOptions: {
                        headerShown: false,
                        animationTypeForReplace: "pop"
                    }
                },
            }),
            Customers: createStackNavigator({
                Customers: {
                    screen: CustomersScreen,
                    navigationOptions: {
                        headerShown: false
                    }
                },
            }),
            Products: createStackNavigator({
                Products: {
                    screen: ProductsScreen,
                    navigationOptions: {
                        headerShown: false,
                        ...MyTransition,

                    }
                }
            }),

        }, {
            defaultNavigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    const { routeName } = navigation.state;
                    // let IconComponent = Icon
                    let iconName;
                    if (routeName === 'Sales') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline'
                    } else if (routeName === 'Products') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    } else if (routeName === 'Customers') {
                        iconName = focused ? "md-contacts" : "md-contacts";
                    }
                    return <Icon name={iconName} size={25} color={tintColor} />;
                },
            }),

            tabBarOptions: {
                activeTintColor: "#f54b64",
                inactiveTintColor: 'gray',
                style: {
                    margin: 5,
                    fontWeight: "bold",
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    // borderRadius: 25,
                    position: 'absolute',
                    bottom: 0,
                    borderTopWidth: 1.5,
                    borderWidth: 1,
                    borderColor: "grey"

                },
                labelStyle: {
                    fontSize: 14,
                    textAlign: 'center',
                },
                indicatorStyle: {
                    borderBottomColor: '#87B56A',
                    borderBottomWidth: 2,
                }
            }
        }),
        Charts: {
            screen: ChartsScreen,
            navigationOptions: {
                headerShown: false,

            }

        },
        AddDelivery: {
            screen: AddDeliveryScreen,
        },
        Details: {
            screen: DetailsScreen,
        },
        Add: {
            screen: AddScreen,
        },
        AddCustomer: {
            screen: AddCustomerScreen,
        },
        CustomerInfo: {
            screen: DetailsScreen,
        },
        AddProduct: {
            screen: AddProductScreen,
        },
        ProductDetails: {
            screen: ProductDetailsScreen,

        }



    }, {
        defaultNavigationOptions: {
            headerShown: false,
            ...MyTransition,
        }
    }
    )
})





export default RootNavigation