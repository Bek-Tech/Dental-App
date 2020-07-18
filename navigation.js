import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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

const headerStyle = {
    headerStyle: {
        backgroundColor: '#9484DE'
    },
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

const RootNavigation = createSwitchNavigator({
    Loading: LoadingScreen,
    MainFlow: createBottomTabNavigator({
        Sales: createStackNavigator({
            SalesList: {
                screen: SalesListScreen,
                navigationOptions: {
                    headerShown: false
                }
            },

            Details: {
                screen: DetailsScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
            Add: {
                screen: AddScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
            AddDelivery: {
                screen: AddDeliveryScreen,

                navigationOptions: {
                    headerShown: false,
                    unmountOnBlur: true,
                }
            },
            Charts: {
                screen: ChartsScreen,
                navigationOptions: {
                    headerShown: false
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
            AddCustomer: {
                screen: AddCustomerScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
            CustomerInfo: {
                screen: DetailsScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
            AddDelivery: {
                screen: AddDeliveryScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
            Charts: {
                screen: ChartsScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
        }),
        Products: createStackNavigator({
            Products: {
                screen: ProductsScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
            AddProduct: {
                screen: AddProductScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
            ProductDetails: {
                screen: ProductDetailsScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
            AddDelivery: {
                screen: AddDeliveryScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
            Charts: {
                screen: ChartsScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
        })
    },
        {
            defaultNavigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    const { routeName } = navigation.state;
                    // let IconComponent = Icon
                    let iconName;
                    if (routeName === 'Sales') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                        // Sometimes we want to add badges to some icons.
                        // You can check the implementation below.
                        // IconComponent = HomeIconWithBadge;
                    } else if (routeName === 'Products') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    } else if (routeName === 'Customers') {
                        iconName = focused ? "md-contacts" : "md-contacts";
                    }
                    return <Icon name={iconName} size={25} color={tintColor} />;
                },
            }),
            swipeEnabled: true,
            animationEnabled: true,

            tabBarOptions: {
                activeTintColor: 'white',
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
        })
})





export default RootNavigation