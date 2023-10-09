import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';

import AuthObserver from './components/config/AuthObserver';
import LoginPage from './components/screens/Login';
import RegisterPage from './components/screens/Regist';
import HomePage from './components/screens/Home';
import AddPage from './components/screens/Tambah';
import SettingPage from './components/screens/Setting';
import HelpPage from './components/screens/Help';
import AboutPage from './components/screens/About';
import ListPage from './components/screens/List';
import SearchScanPage from './components/screens/SearchScan';
import DetailPage from './components/screens/Detail';
import EditPage from './components/screens/Edit';
import ScannerPage from './components/screens/Scanner';
import AddScannerPage from './components/screens/AddScanner';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="register" component={RegisterPage} options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={HomePage} options={{ headerShown: false }}/>
        <Stack.Screen name="add" component={AddPage} options={{ headerShown: false }}/>
        <Stack.Screen name="setting" component={SettingPage} options={{ headerShown: false }}/>
        <Stack.Screen name="help" component={HelpPage} options={{ headerShown: false }}/>
        <Stack.Screen name="about" component={AboutPage} options={{ headerShown: false }}/>
        <Stack.Screen name="list" component={ListPage} options={{ headerShown: false }}/>
        <Stack.Screen name="searchScan" component={SearchScanPage} options={{ headerShown: false }}/>
        <Stack.Screen name="detail" component={DetailPage} options={{ headerShown: false }}/>
        <Stack.Screen name="edit" component={EditPage} options={{ headerShown: false }}/>
        <Stack.Screen name="scanner" component={ScannerPage} options={{ headerShown: false }}/>
        <Stack.Screen name="addScanner" component={AddScannerPage} options={{ headerShown: false }}/>
        <Stack.Screen name="authObserver" component={AuthObserver} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
