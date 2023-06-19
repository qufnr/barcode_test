import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer, } from '@react-navigation/native'
import { createStackNavigator, } from '@react-navigation/stack'
import Home from './components/Home'
import BarcodeScanner from './components/BarcodeScanner'

const navgiationOptionHandler = () => ({
    headerShown: false,
})

const Stack = createStackNavigator()

export default App = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={ Home } options={ navgiationOptionHandler } />
            <Stack.Screen name="BarcodeScanner" component={ BarcodeScanner } options={ navgiationOptionHandler } />
        </Stack.Navigator>
    </NavigationContainer>
)