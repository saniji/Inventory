import React, { useState } from "react";
import {StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
  Pressable
} from "react-native";

import { firebase } from "../config/Firebase";
import { createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';

import SafeViewAndroid from '../SafeViewAndroid';
import Header from '../Header';

const RegisterPage = ({ navigation }) => {
  const [registerData, setRegisterData] =  useState({userName: '', passWord: '', fullName: ''});

  const updateUserName = (userNameValue) => {
    setRegisterData({...registerData, userName: userNameValue});
  }

  const updatePassWord = (passWordValue) => {
    setRegisterData({...registerData, passWord: passWordValue});
  }

  const updateFullName = (fullNameValue) => {
    setRegisterData({...registerData, fullName: fullNameValue});
  }

  const onSignUpHandle = () => {
    if(registerData["userName"] !== null && registerData["passWord"] !== null) {
        createUserWithEmailAndPassword(firebase.auth(),registerData["userName"], registerData["passWord"])
        .then((userCredential) => {
            const user = userCredential.user;
                updateProfile(firebase.auth().currentUser, {
                    displayName: registerData["fullName"]
                }).then(() => {
                    signOut(firebase.auth()).then(() => {
                        console.log("Regist sukses");
                        navigation.replace("login");
                    }).catch((errors) => {
                        alert(errors.message)
                    })
                }).catch((error) => {
                    alert(error.message);
                })
        })
        .catch((err) => {
            alert(err)
        })
    }
}
    return (
      <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
        <View style={styles.garis}>
          <Header headerTitle="   Register"/>
        </View>
        <View style={styles.form}>
            <Text style={styles.title}>Complete your personal data correctly</Text>
            <Text style={styles.required}>*required</Text>
            <Text style={styles.name}>Full Name*</Text>
            <View style={styles.line}>
              <TextInput
                placeholder="Input nama lengkap"
                style={styles.input}
                onChangeText={(val) => updateFullName(val)}
              />
            </View>
            <Text style={styles.name}>E-mail*</Text>
            <View style={styles.line}>
            <TextInput
                placeholder="Input E-mail"
                style={styles.input}
                onChangeText={(val) => updateUserName(val)}
              />
            </View>
            <Text style={styles.name}>Password*</Text>
            <View style={styles.line}>
            <TextInput
                placeholder="Input Password"
                style={styles.input}
                onChangeText={(val) => updatePassWord(val)}
              />
            </View>
        </View>
        <Pressable onPress={() => onSignUpHandle()} style={styles.BoxSubmit}>
          <Text style={styles.submit}>
            Register
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      flex: 1
    },
    form: {
        backgroundColor: "#013CBE",
        position: "absolute",
        width: 321,
        height: 293,
        left: 32,
        top: 193,
        borderRadius: 10
    },
    garis: {
      width: "100%",
      height: 62,
      backgroundColor: "#BCBCBC",
      borderRadius: 1,
    },
    title: {
        color: "#CBE4DE",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 10,
    },
    required: {
        color: "red",
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 5,
    },
    name: {
        color: "#CBE4DE",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 25,
    },
    line: {
      width: 289,
      height: 1,
      backgroundColor: "white",
      borderRadius: 1,
      marginBottom: 50,
  },
  line2: {
    width: 242,
    left: 46,  
    height: 1,
    backgroundColor: "white",
    borderRadius: 1,
    marginBottom: 8,
  },
  BoxSubmit: {
    position: "absolute",
    width: 240,
    height: 50,
    top: 230,
    marginLeft: 70,
    margin: 280,
    backgroundColor: "#013CBE",
    borderRadius: 25,
    textAlign: "center",
    justifyContent: "center",
  },
  submit: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    position:"absolute",
    top: -30,
    height: 40,
    width: 351,
    textAlign: "left",
    borderWidth: 1,
    borderColor:"transparent",
    color:"white"
  },

});

  export default RegisterPage;