// Halaman ini digunakan untuk menambahkan barang secara manual
import React, {useState} from 'react';
import { Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { firebase } from '../config/Firebase';
import SafeViewAndroid from '../SafeViewAndroid';
import Header from '../Header';

const AddPage = ({navigation}) => {
    const todoRef = firebase.firestore().collection('list');

    const [serial, onChangeSerial] = useState('');
    const [merk, onChangeMerk] = useState('');
    const [tipe, onChangeTipe] = useState('');
    const [jenis, onChangeJenis] = useState('');
    const [operasi, onChangeOperasi] = useState('');
    const [unit, onChangeUnit] = useState('');
    const [lokasi, onChangeLokasi] = useState('');

    const [image, onChangeImage] = useState(null);
    const [uploading, onChangeUploading] = useState(false);

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

    const uploadImage = async (docId) => {
      if (image) {
        onChangeUploading(true);
      }
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        const filename = `${docId}.jpg`; // Modify the filename as needed
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
        serial &&
        serial.length &&
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
          // Generate a unique document ID
          const docRef = todoRef.doc();
          const docId = docRef.id;

          let imageUrl = null;
          if (image) {
            imageUrl = await uploadImage(docId);
          }
          
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          const data = {
            nomor: serial,
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
                onChangeSerial('');
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

    return(
        <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
        <View style={styles.garis}>
          <Header headerTitle="   Tambah Barang"/>
        </View>
        <View style={styles.box}>
          <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <ScrollView>
              <Text style={styles.name}>Serial Number</Text>
              <View style={styles.line}>
                <TextInput
                  placeholder="Input serial number"
                  onChangeText={(val) => onChangeSerial(val)} value={serial}
                  returnKeyType="next"
                  style={styles.input}
                />
              </View>
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
        <TouchableOpacity style={styles.BoxSubmit} onPress = { () => {
          addField();
        }} 
        disabled={
          serial == '' || merk == '' || tipe == '' ||
          jenis == '' || operasi == '' || unit == '' ||
          lokasi == ''
          }
        >
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
        height: 680,
        left: 16,
        top: 110,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 1
    },
    garis: {
        width: "100%",
        height: 62,
        backgroundColor: "#BCBCBC",
        borderRadius: 1,
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
        top: 193,
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
        top: -30,
        height: 40,
        width: 351,
        textAlign: "left",
        borderWidth: 1,
        borderColor:"transparent",
        color:"white"
    },
    BoxUpload: {
      position: "absolute",
        width: 240,
        height: 50,
        top: 133,
        marginLeft: 76,
        margin: 540,
        backgroundColor: "#00FFFF",
        borderRadius: 25,
        textAlign: "center",
        justifyContent: "center",
    }
});
export default AddPage;