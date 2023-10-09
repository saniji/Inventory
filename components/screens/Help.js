import React from "react";

import { Text, View, SafeAreaView, StyleSheet, StatusBar } from "react-native";

import SafeViewAndroid from '../SafeViewAndroid';
import Header from '../Header';

const HelpPage = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
            <View style={styles.garis}>
                <Header headerTitle="   Help"/>
            </View>
            <View style={styles.box}>
                {/* <Text style={styles.info}>
                    Jika terjadi masalah saat kembali dari menu Tambah Barang melalui menu QR Code
                    yaitu pada saat ingin melakukan Scan ulang tetapi tidak dapat mendeteksi QR Code
                    maka pengguna wajib kembali menuju halaman utama atau halaman home untuk mereset
                    status serial number pada menu QR Code
                </Text> */}
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
        backgroundColor: "blue",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    info: {
        color:"white",
    }
})

export default HelpPage