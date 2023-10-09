import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar} from 'react-native';
import Icon from "react-native-vector-icons/Feather";

import { firebase } from '../config/Firebase';
import { signOut } from 'firebase/auth';

import Header from '../Header';
import SafeViewAndroid from '../SafeViewAndroid';
import Navbar from '../Navbar';

const SettingPage = ({navigation}) => {
  
  const signOutHandler = () => {
    signOut(firebase.auth())
    .then(() => {
      console.log("Logout Sukses")
    }).catch((err) => console.log(err));
}

  return (
    <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
        <View style={styles.garis}>
            <Header headerTitle="   Setiing"/>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('help')}>
            <Icon name="help-circle" size={29} style={{color: "white", marginLeft: 12}} ></Icon>
            <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('about')}>
            <Icon name="info" size={29} style={{color: "white", marginLeft: 12}} ></Icon>
            <Text style={styles.buttonText}>About App</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_logout} onPress={() => signOutHandler()}>
            <Icon name="log-out" size={29} style={{color: "black", marginLeft: 20, marginTop: 5}} ></Icon>
            <Text style={styles.buttonText_logout}>Log Out</Text>
        </TouchableOpacity>
        <View style={{position: "absolute", bottom: 0,}}>
            <Navbar whichPage="setting"/>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3333',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    garis: {
        width: "100%",
        height: 62,
        backgroundColor: "#BCBCBC",
        borderRadius: 1,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#013CBE',
        paddingVertical: 15,
        paddingHorizontal: 5,
        marginBottom: 3,
        flexDirection : 'row',
        alignItems : 'center',
    },
    button_logout: {
        width: 138,
        height: 38,
        backgroundColor: '#CBE4DE',
        marginLeft: 125,
        borderRadius: 15,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        flexDirection: 'column',
        marginLeft: 15
    },
    buttonText_logout: {
        fontSize: 16,
        color: 'black',
        marginLeft: 55,
        marginTop: -27,
        fontWeight: 'bold',
    },
});
export default SettingPage;