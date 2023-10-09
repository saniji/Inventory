import React, { useState } from "react";
import {StyleSheet,Text,View,TextInput,SafeAreaView, StatusBar, Pressable, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Firebase
import { firebase } from '../config/Firebase';

// Local
import AuthObserver from "../config/AuthObserver";

import SafeViewAndroid from '../SafeViewAndroid';
const LoginPage = ({navigation}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    };

    const [loginData, setLoginData] =  useState({userName: '', passWord: ''});

    const updateUserName = (userNameValue) => {
        setLoginData({...loginData, userName: userNameValue});
    }

    const updatePassWord = (passWordValue) => {
        setLoginData({...loginData, passWord: passWordValue});
    }
    
    const handleLogin = () => {
        if(loginData["userName"] !== null && loginData["passWord"] !== null) {
            firebase.auth().signInWithEmailAndPassword (loginData["userName"], loginData["passWord"])
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.replace("authObserver");
            })
            .catch((err) => alert(err));
        }
    }

    return(
        <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
            <View style={styles.BoxLogin}>
                <Text style={styles.in}>
                    Log In
                </Text>
                <Text style={styles.email}>
                    Email or Phone Number
                </Text>
                <Icon name="mail" size={20} style={{position: "absolute", color: "white", top: 139, left: 29}} ></Icon>
                <View style={styles.line}>
                    <TextInput
                        placeholder="Email or Phone Number"
                        style={styles.input}
                        onChangeText={(val) => updateUserName(val)}
                    />
                </View>
                <Text style={styles.pass}>
                    Password
                </Text>
                <Icon name="lock-closed" size={20} style={{position: "absolute", color: "white", top: 220, left: 29}} ></Icon>
                <View style={styles.line2}>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry={!passwordVisible}
                        onChangeText={(val) => updatePassWord(val)}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Icon name={passwordVisible ? "ios-eye": "ios-eye-off"} size={20} style={{position: "absolute", color: "white", top: -20, left: 268}}/>
                    </TouchableOpacity>
                </View>
                <Pressable onPress={() => handleLogin()} style={styles.BoxLogin2}>
                    <Text style={styles.login}>
                        Login
                    </Text>
                </Pressable>
                <Text style={styles.any}>
                    Don't have an account yet?
                </Text>
                <Pressable>
                    <Text style={styles.any2}  onPress={() => navigation.navigate("register")}>
                        Create one here
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    BoxLogin: {
        position: "absolute",
        backgroundColor: "#013CBE",
        width: 360,
        height: 360,
        left: 14,
        top: 184,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 10
    },
    in: {
        position: "absolute",
        color: "white",
        fontSize: 32,
        marginTop: 30,
        left: 35,
        fontWeight: "bold",
        textAlign: "center",
    },
    BoxLogin2: {
        position: "absolute",
        width: 240,
        height: 50,
        marginLeft: 50,
        margin: 280,
        backgroundColor: "white",
        borderRadius: 25,
        textAlign: "center",
        justifyContent: "center",
    },
    login: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    email: {
        position: "absolute",
        color: "white",
        top: 100,
        left: 32,
        fontSize: 16,
        fontWeight: "bold",
    },
    line: {
        position: "absolute",
        width: 289,
        height: 1,
        left: 30,
        top: 160,
        backgroundColor: "white",
        borderRadius: 1,
    },
    pass: {
        position: "absolute",
        color: "white",
        top: 180,
        left: 32,
        fontSize: 16,
        fontWeight: "bold",
    },
    line2: {
        position: "absolute",
        width: 289,
        height: 1,
        left: 30,
        top: 244,
        backgroundColor: "white",
        borderRadius: 1,
    },
    any: {
        color: "black",
        position: "absolute",
        left: 95,
        top: 358,
    },
    any2: {
        color: "black",
        position: "absolute",
        left: 127,
        top: 377,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    input: {
        position:"absolute",
        top: -30,
        height: 40,
        width: 351,
        marginLeft: 27,
        borderWidth: 1,
        borderColor:"transparent",
        color: 'white'
    },

})
export default LoginPage