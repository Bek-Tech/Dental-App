import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SalesListScreen from './screens/SalesListScreen'
import DetailsScreen from './screens/DetailsScreen'
import AddScreen from './screens/AddScreen'
import AddCustomerScreen from './screens/AddCustomerScreen'
import AddProductScreen from './screens/AddProductScreen'
import CustomersScreen from './screens/CustomersScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import ProductsScreen from './screens/ProductsScreen'
import Icon from 'react-native-vector-icons/Ionicons'

const headerStyle = {
    headerStyle: {
        backgroundColor: '#9484DE'
    },
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

const RootNavigation = createBottomTabNavigator({
    Sales: createStackNavigator({
        Journal: {
            screen: SalesListScreen,
            navigationOptions: {
                header: null
            }
        },
        Details: {
            screen: DetailsScreen,
            navigationOptions: headerStyle
        },
        Add: {
            screen: AddScreen,
            navigationOptions: headerStyle
        }
    }),
    Customers: createStackNavigator({
        Customers: {
            screen: CustomersScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        AddCustomer: {
            screen: AddCustomerScreen
        },
        CustomerInfo: DetailsScreen
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
            navigationOptions: { ...headerStyle, title: "Add Product" }
        },
        ProductDetails: {
            screen: ProductDetailsScreen,
            navigationOptions: { ...headerStyle, title: "Product Info" }
        }
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
            activeTintColor: '#49036C',
            inactiveTintColor: 'black',
            style: {
                margin: 5,
                fontWeight: "bold",
                // borderTopLeftRadius: 25,
                // borderTopRightRadius: 25,
                backgroundColor: "white",
                borderRadius: 25,
                position: 'absolute',
                borderTopWidth: 1.5,
                borderWidth: 1,
                borderColor: "grey"

            },
            labelStyle: {
                fontSize: 14,
                color: 'black',
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            }
        }
    })

export default RootNavigation