import React from 'react';
import { Text,
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import SafeViewAndroid from '../SafeViewAndroid';
import Navbar from '../Navbar';

const HomePage = ({navigation}) => {
    return(
        <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
            <Text style={{fontSize:24, top:30, left:15, color:"#013CBE",}}>Home</Text>
            <View style={[styles.line]}></View>
            <Text style={{fontSize:22, marginTop: 46, textAlign: 'center', color: "#013CBE"}}>Inventory</Text>
            <Text style={{fontSize:22, textAlign: 'center', color: "#013CBE"}}>PLN UID Lampung</Text>
            <TouchableOpacity>
                <View style={[styles.boxAdd]}>
                    <Ionicons name='md-add-circle-outline' size={110} style={{ color:'black', textAlign:'center'}}
                    onPress={()=> navigation.navigate('add')} />
                    <Text style={{fontSize:18, color:"black", textAlign:'center', marginTop: -6}}>Tambah Barang</Text>
                </View>
                <View style={[styles.boxQr]}>
                    <Ionicons name="qr-code-outline" size={110} style={{ color:'black', textAlign:'center'}}
                    onPress={()=> navigation.navigate('scanner')}/>
                    <Text style={{fontSize:18, color:"black", textAlign:'center', marginTop: -6}}>Scan QR Code</Text>
                </View>
                <View style={[styles.boxList]}>
                    <FontAwesome name="list-alt" size={117} style={{ color:'black', textAlign:'center'}}
                    onPress={()=> navigation.navigate('list')}/>
                    <Text style={{fontSize:18, color:"black", textAlign:'center', marginTop: -6}}>List Barang</Text>
                </View>
                <View style={[styles.boxSetting]}>
                    <Ionicons name="md-settings" size={110} style={{ color:'black', textAlign:'center'}}
                    onPress={()=> navigation.navigate('setting')}/>
                    <Text style={{fontSize:18, color:"black", textAlign:'center', marginTop: -6}}>Setting</Text>
                </View>
            </TouchableOpacity>
            <View style={{position: "absolute", bottom: 0,}}>
                <Navbar whichPage="home"/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "#2C3333",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    line: {
        position: "absolute",
        width: 400,
        height: 1,
        marginTop: 100,
        backgroundColor: "#BCBCBC",
        borderRadius: 1,
    },
    boxAdd: {
        width: 135,
        height: 135,
        backgroundColor: "white",
        borderRadius: 10,
        marginLeft: 18,
        marginTop: 20,
        elevation: 10
    },
    boxQr: {
        width: 135,
        height: 135,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: -135,
        marginLeft: 220,
        elevation: 10
    },
    boxList: {
        width: 135,
        height: 135,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 90,
        marginLeft: 18,
        elevation: 10
    },
    boxSetting: {
        width: 135,
        height: 135,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: -135,
        marginLeft: 220,
        elevation: 10
    }
});
export default HomePage;