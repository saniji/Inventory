import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

class Navbar extends Component {
    
    render() {
        const { navigation } = this.props;
        return (
                <View style={[styles.container, {backgroundColor: "#0099FF"}]}>
                    <Pressable style={styles.itemNavbar} onPress={() => this.props.navigation.replace('home')}>
                        <Ionicons name="home" size={30} style={{color: this.props.whichPage === "home" ? "#0E8388" : "#2C3333"}}/>
                        <Text style={{fontSize: 12, fontWeight:"400", color: this.props.whichPage === "home" ? "#0E8388" : "#2C3333"}}>Home</Text>
                    </Pressable>
                    <Pressable style={styles.itemNavbar} onPress={() => this.props.navigation.replace('scanner')}>
                        <Ionicons name="qr-code-outline" size={30} style={{color: this.props.whichPage === "scanner" ? "#0E8388" : "#2C3333"}}/>
                        <Text style={{fontSize: 12, fontWeight:"400", color:this.props.whichPage === "scanner" ? "#0E8388" : "#2C3333"}}>Scanner</Text>
                    </Pressable>
                    <Pressable style={styles.itemNavbar} onPress={() => this.props.navigation.replace('list')}>
                        <FontAwesome name="list-alt" size={30} style={{color: this.props.whichPage === "list" ? "#0E8388" : "#2C3333"}}/>
                        <Text style={{fontSize: 12, fontWeight:"400", color:this.props.whichPage === "list" ? "#0E8388" : "#2C3333"}}>List</Text>
                    </Pressable>
                    <Pressable style={styles.itemNavbar} onPress={() => this.props.navigation.replace('setting')}>
                        <Ionicons name="md-settings" size={30} style={{color: this.props.whichPage === "setting" ? "#0E8388" : "#2C3333"}}/>
                        <Text style={{fontSize: 12, fontWeight:"400", color: this.props.whichPage === "setting" ? "#0E8388" : "#2C3333"}}>Setting</Text>
                    </Pressable>
                </View>
        );
    }
}
export default function (props) {
    const navigation = useNavigation();
    return <Navbar {...props} navigation={navigation} />;
  };

const styles = StyleSheet.create({
    container: {
        width: 390,
        height: 60,
        flexDirection : 'row',
        height: 59,
        alignItems : "center",
        justifyContent: 'space-around',
        paddingTop: 8,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    navbarText:{
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 16,
        color: "#CBE4DE",
        alignSelf: "center",
    },
    itemNavbar:{
        alignItems: "center",
        justifyContent: "center",
    },
});