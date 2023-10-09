// Halaman ini digunakan untuk menampilkan daftar barang
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {firebase} from '../config/Firebase'
import SafeViewAndroid from '../SafeViewAndroid';
import Header from '../Header';
import Navbar from "../Navbar";

const ListPage = ({navigation}) => {
    const [data, setData] = useState([]);
    const todoRef = firebase.firestore().collection('list');
    const [search, onChangeSearch] = useState("");

    useEffect(() => {
        todoRef
        .onSnapshot(
            querySnapshot => {
                const data = []
                querySnapshot.forEach((doc) => {
                    const {merk, jenis, lokasiPenyimpanan, createdByEmail} = doc.data()
                    data.push({
                        id : doc.id,
                        merk,
                        jenis,
                        lokasiPenyimpanan,
                        createdByEmail
                    });
                });
                // Filter the data based on the search input
                const filterData = data.filter(
                    (item) =>
                    item.merk.toLowerCase().includes(search.toLowerCase()) ||
                    item.jenis.toLowerCase().includes(search.toLowerCase()) ||
                    item.lokasiPenyimpanan.includes(search.toLowerCase()) ||
                    item.createdByEmail.toLowerCase().includes(search.toLowerCase())
                );
                setData(filterData);
            });
    }, [search]);

    const handleDelete = async (itemId) => {
        try {
            // Get the document data to retrieve the image URL
            const docSnapshot = await todoRef.doc(itemId).get();
            const data = docSnapshot.data();
      
        // If the document has an imageUrl, delete the image from Storage
        if (data && data.imageUrl) {
            const imageUrl = data.imageUrl;
            const storageRef = firebase.storage().refFromURL(imageUrl);
            await storageRef.delete();
        }

        // Delete the document from Firestore
        await todoRef.doc(itemId).delete();

        } catch(error){
            console.error('Any Problems!', error)
        }
      };

      const handleDetail = (itemId) => {
        navigation.navigate('detail', { itemId });
      };

      const handleEdit = (itemId) => {
        navigation.navigate('edit', { itemId });
      };

    return(
        <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
            <View style={styles.garis}>
                <Header headerTitle= "   List Barang"/>
            </View>
            <View style={styles.BoxSearch}>
                <Icon name="ios-search" size={27} style={{color: "white", marginTop: 7, marginLeft: 12, height: 35}} ></Icon>
                <TextInput
                    placeholder="Cari barang..."
                    style={styles.input}
                    onChangeText={(val) => onChangeSearch(val)}
                    value={search}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('searchScan')}>
                <View style={styles.boxScan}>
                    <MaterialCommunityIcons name="barcode-scan" size={40} color="black" />
                </View>
            </TouchableOpacity>
            <FlatList style={{marginBottom: 68}} data={data}
            numColumns={1}
            renderItem={({item}) => (
                <View style={styles.form}>
                    <Text style={styles.ket}> User Input </Text>
                    <Text style={styles.itemCek}>{item.createdByEmail}</Text>
                    <View style={[styles.line2]}/>

                    <Text style={styles.ket}> Merk </Text>
                    <Text style={styles.itemCek}>{item.merk}</Text>
                    <View style={[styles.line2]}/>

                    <Text style={styles.ket}> Jenis </Text>
                    <Text style={styles.itemCek}>{item.jenis}</Text>
                    <View style={[styles.line2]}/>

                    <Text style={styles.ket}> Lokasi Penyimpanan </Text>
                    <Text style={styles.itemCek}>{item.lokasiPenyimpanan}</Text>
                    <View style={[styles.line2]}/>

                    <TouchableOpacity onPress={() => handleDetail(item.id)}>
                        <View style={styles.detailBox}>
                            <MaterialIcons name="drag-handle" size={33} color="black" />
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => handleEdit(item.id)}>
                        <View style={styles.editBox}>
                            <FontAwesome name="edit" size={30} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <View style={styles.deleteBox}>
                            <MaterialIcons name="delete" size={33} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            )}>
            </FlatList>
            <View style={{position: "absolute", bottom: 0,}}>
                <Navbar whichPage="list"/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    garis: {
        width: "100%",
        height: 62,
        backgroundColor: "#BCBCBC",
        borderRadius: 1,
    },
    BoxSearch: {
      backgroundColor: "#D9D9D9",
      width: 317,
      height: 50,
      borderRadius: 30,
      margin: 15,
      marginTop: 10,
      justifyContent: "center",
    },
    input: {
        position:"absolute",
        top: 5,
        height: 40,
        width: 351,
        marginLeft: 42,
        borderWidth: 1,
        borderColor:"transparent",
    },
    form: {
        backgroundColor: "#013CBE",
        width: 320,
        height: 225,
        marginTop: 10,
        marginLeft: 13,
        borderRadius: 10
    },
    ket: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        paddingHorizontal: 29,
        marginBottom: 19,
    },
    line2: {
        width: 294,
        height: 1,
        marginLeft: 25,
        backgroundColor: "#BCBCBC",
        borderRadius: 1,
        top: -17,
    },
    itemCek: {
        color: "white",
        fontWeight:'bold',
        textAlign: 'center',
        top: -16
    },
    editBox: {
        width: 30,
        height: 30,
        marginLeft: 325,
        marginTop: -172,
        borderRadius: 1,
    },
    deleteBox: {
        width: 30,
        height: 30,
        marginLeft: 320,
        marginTop: -117,
        borderRadius: 1,
    },
    detailBox: {
        width: 30,
        height: 30,
        marginLeft: 320,
        marginTop: -226,
        borderRadius: 1,
    },
    boxScan: {
        width: 50,
        height: 50,
        marginLeft: 340,
        marginTop: -60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        borderRadius: 9,
    },
    camera: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

  });

export default (ListPage);