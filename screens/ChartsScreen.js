import React, { useState, useEffect } from 'react'
import { View, Text, Button, Modal, TouchableOpacity, Dimensions, Keyboard, KeyboardAvoidingView } from 'react-native'
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import AddContainer from "../components/AddContainer"


const ChartsScreen = ({ navigation }) => {

    return (
        <AddContainer
            title="Charts"
            BackButton={() => navigation.goBack()}
        >
            <Text>charts</Text>
        </AddContainer>

    );
}



export default ChartsScreen




