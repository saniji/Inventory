// Halaman ini merupakan halaman yang berfungsi untuk mengatur penambahan barang melalui scanner
import React, { useState } from 'react';
import { View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { firebase } from '../config/Firebase';
import SafeViewAndroid from '../SafeViewAndroid';

const AddScannerPage = ({ route, navigation }) => {
    const todoRef = firebase.firestore().collection('list');

    const [merk, onChangeMerk] = useState('');
    const [tipe, onChangeTipe] = useState('');
    const [jenis, onChangeJenis] = useState('');
    const [operasi, onChangeOperasi] = useState('');
    const [unit, onChangeUnit] = useState('');
    const [lokasi, onChangeLokasi] = useState('');

    const [image, onChangeImage] = useState(null);
    const [uploading, onChangeUploading] = useState(false);

    const { serialNumber } = route.params;

    const pickImage = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [5, 5],
        quality: 1,
      });
      
      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        onChangeImage(selectedAsset.uri);
      }
    };

    const uploadImage = async () => {
      if (image) {
        onChangeUploading(true);
      }
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        const filename = `${Date.now()}.jpg`; // Modify the filename as needed
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${filename}`);
        
        await imageRef.put(blob);
        const imageUrl = await imageRef.getDownloadURL();
    
        onChangeUploading(false);
        return imageUrl; // Return the image URL
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error', 'An error occurred while uploading the image.');
        throw error;
      }
    };

    const addField = async () => {
        const user = firebase.auth().currentUser;
        const userEmail= user ? user.email : null;

        if (
        merk &&
        merk.length &&
        tipe &&
        tipe.length &&
        jenis &&
        jenis.length &&
        operasi &&
        operasi.length &&
        unit &&
        unit.length &&
        lokasi &&
        lokasi.length > 0
      ) {
        try {
          let imageUrl = null;
          if (image) {
            imageUrl = await uploadImage();
          }
          
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          const data = {
            nomor: serialNumber,
            merk: merk,
            type: tipe,
            jenis: jenis,
            tanggalOperasi: operasi,
            unit: unit,
            lokasiPenyimpanan: lokasi,
            createdAt: timestamp,
            createdByEmail: userEmail, // Add user's email to the data
          };
  
          if (imageUrl) {
            data.imageUrl = imageUrl;
          }
  
          await todoRef.add(data);
  
          console.log('Document successfully added!');
          Alert.alert('Success', 'Data Telah Ditambahkan', [
            {
              text: 'OK',
              onPress: () => {
                onChangeMerk('');
                onChangeTipe('');
                onChangeJenis('');
                onChangeOperasi('');
                onChangeUnit('');
                onChangeLokasi('');
                onChangeImage(null); // Reset image state
              },
            },
          ]);
        } catch (error) {
          console.error('Error adding document:', error);
          Alert.alert('Error', 'An error occurred while adding the document.');
        }
      }
    };

    return (
        <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
            <Text style={{fontSize:24, top:5, left:15, color:"#013CBE",}}>Tambah Barang</Text>
            <View style={styles.garis}></View>
            <View style={styles.box}>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <Text style={styles.name}>Serial Number</Text>
                        <View style={styles.line}></View>
                        <Text style={styles.serialNumber}>{serialNumber}</Text>

                        <Text style={styles.name}>Merk</Text>
                        <View style={styles.line}>
                        <TextInput
                            placeholder="Input merk"
                            onChangeText={(val) => onChangeMerk(val)} value={merk}
                            returnKeyType="next"
                            style={styles.input}
                            />
                    </View>

                        <Text style={styles.name}>Tipe/Seri</Text>
                        <View style={styles.line}>
                        <TextInput
                            placeholder="Input tipe/seri"
                            onChangeText={(val) => onChangeTipe(val)} value={tipe}
                            style={styles.input}
                            />
                        </View>

                        <Text style={styles.name}>Jenis</Text>
                        <View style={styles.line}>
                        <TextInput
                            placeholder="Input jenis"
                            onChangeText={(val) => onChangeJenis(val)} value={jenis}
                            style={styles.input}
                            />
                        </View>

                        <Text style={styles.name}>Tanggal Operasi</Text>
                        <View style={styles.line}>
                        <TextInput
                            placeholder="Input tanggal operasi"
                            onChangeText={(val) => onChangeOperasi(val)} value={operasi}
                            style={styles.input}
                            />
                        </View>

                        <Text style={styles.name}>Unit</Text>
                        <View style={styles.line}>
                        <TextInput
                            placeholder="Input unit"
                            onChangeText={(val) => onChangeUnit(val)} value={unit}
                            style={styles.input}
                            />
                        </View>

                        <Text style={styles.name}>Lokasi Perangkat</Text>
                        <View style={styles.line}>
                        <TextInput
                            placeholder="Input lokasi perangkat"
                            onChangeText={(val) => onChangeLokasi(val)} value={lokasi}
                            style={styles.input}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            <TouchableOpacity style={styles.BoxUpload} onPress={pickImage}>
               <Text style={styles.submit}>
                    Pick Image
               </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BoxSubmit} onPress = {() => {
                    addField();
                    navigation.navigate('list')
                }} 
                    disabled={
                        merk == '' || tipe == '' || jenis == '' ||
                        operasi == '' || unit == '' || lokasi == ''
                }>
                <Text style={styles.submit}>
                    Tambah
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
  };
  
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1
    },
    box: {
        backgroundColor: "#013CBE",
        position: "absolute",
        width: 360,
        height: 640,
        left: 16,
        top: 75,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 1
    },
    garis: {
        width: "100%",
        height: 1,
        backgroundColor: "#BCBCBC",
        borderRadius: 1,
        marginTop: 5
    },
    name: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        paddingVertical: 14,
        paddingHorizontal: 23,
        marginBottom: 17,
    },
    line: {
        width: 329,
        height: 1,
        marginLeft: 25,
        backgroundColor: "#BCBCBC",
        borderRadius: 1,
        marginBottom: 8,
    },
    BoxSubmit: {
        position: "absolute",
        width: 240,
        height: 50,
        top: 120,
        marginLeft: 76,
        margin: 540,
        backgroundColor: "white",
        borderRadius: 25,
        textAlign: "center",
        justifyContent: "center",
    },
    submit: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        position: "absolute",
        top: -30,
        height: 40,
        width: 351,
        textAlign: "left",
        borderWidth: 1,
        borderColor:"transparent",
        color:"white"
    },
    serialNumber: {
        position: "absolute",
        color: "white",
        marginLeft: 22,
        marginTop: 46
    },
    BoxUpload: {
      position: "absolute",
        width: 240,
        height: 50,
        top: 60,
        marginLeft: 76,
        margin: 540,
        backgroundColor: "#00FFFF",
        borderRadius: 25,
        textAlign: "center",
        justifyContent: "center",
    }
});  

export default AddScannerPage;