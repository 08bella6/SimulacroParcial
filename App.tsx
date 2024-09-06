import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ComponenteParcial01 from './src/primera-parcial/ComponenteParcial01';
import PropsParcial02 from './src/primera-parcial/PropsParcial02';
import AxiosParcial03 from './src/primera-parcial/AxiosParcial03';
import AsyncStorageParcial04 from './src/primera-parcial/AsyncStorageParcial';


//import ApiFetch from './src/Practica02/ApiFetch';
//import DataManager from './src/Practica02/DataManager';
//import MainComponent from './src/Practica02/MainComponent';
//import UserDetails from './src/Practica02/UserDetails';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ComponenteParcial01">
        <Stack.Screen name="ComponenteParcial01 " component={ComponenteParcial01} />
        <Stack.Screen name="PropsParcial02" component={PropsParcial02} />
        <Stack.Screen name="AxiosParcial03" component={AxiosParcial03} />
        <Stack.Screen name="AsyncStorageParcial04" component={AsyncStorageParcial04}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
