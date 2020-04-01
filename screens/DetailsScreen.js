import React from 'react'
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

export default function DetailsScreen() {
    return <>
        <LinearGradient colors={['#9484DE', '#49036C']}
            style={{ flex: 1 }} >
            <Text>Details</Text>
        </LinearGradient>
    </>
}
