import React from "react";

import { Text, View, SafeAreaView, StyleSheet, StatusBar } from "react-native";

import SafeViewAndroid from '../SafeViewAndroid';
import Header from '../Header';

const AboutPage = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
            <View style={styles.garis}>
                <Header headerTitle="   About"/>
            </View>
            <View style={styles.box}>
                <Text style={styles.info}>
                    Aplikasi Inventory
                </Text>
            </View>
        </SafeAreaView>
    )
};

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
    box:{
        marginTop: 30,
        marginLeft: 40,
        width: 300,
        height: 120,
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    info: {
        color:"black",
    }
})

export default AboutPage