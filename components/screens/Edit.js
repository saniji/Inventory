// Halaman ini merupakan halaman yang mengatur edit data
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 

import SafeViewAndroid from '../SafeViewAndroid';
import Header from '../Header'; 
import { firebase } from '../config/Firebase';

const EditPage = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [nomor, setNomor] = useState('');
  const [merk, setMerk] = useState('');
  const [type, setType] = useState('');
  const [jenis, setJenis] = useState('');
  const [tanggalOperasi, setTanggalOperasi] = useState('');
  const [unit, setUnit] = useState('');
  const [lokasiPenyimpanan, setLokasiPenyimpanan] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch the item details from Firestore based on the item ID
    const getItemDetails = async () => {
      try {
        const itemRef = firebase.firestore().collection('list').doc(itemId);
        const snapshot = await itemRef.get();

        if (snapshot.exists) {
          const { nomor, merk, type, jenis, tanggalOperasi, unit, lokasiPenyimpanan, imageUrl } = snapshot.data();
          setNomor(nomor);
          setMerk(merk);
          setType(type);
          setJenis(jenis);
          setTanggalOperasi(tanggalOperasi);
          setUnit(unit);
          setLokasiPenyimpanan(lokasiPenyimpanan);
          setImageUrl(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    getItemDetails();
  }, [itemId]);

  const handleSelectImage = async () => {
    try {
      // Ask for permission to access the device's image gallery
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        console.error('Permission to access images denied.');
        return;
      }

      // Launch the image picker
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleUpdate = async (itemId) => {
    // Update the item details in Firestore
    try {
        const itemRef = firebase.firestore().collection('list').doc(itemId);
        itemRef
        .update({
            nomor,
            merk,
            type,
            jenis,
            tanggalOperasi,
            unit,
            lokasiPenyimpanan,
            imageUrl
        });
        if (selectedImage) {
            const docSnapshot = await itemRef.get();
            const data = docSnapshot.data();

            // Delete the old image from Storage if there's an existing image
            if (data && data.imageUrl) {
                const oldImageUrl = data.imageUrl;
                const oldImageRef = firebase.storage().refFromURL(oldImageUrl);
                await oldImageRef.delete();
            }

            const response = await fetch(selectedImage.uri);
            const blob = await response.blob();
            const storageRef = firebase.storage().ref().child(`images/${itemId}.jpg`);
            await storageRef.put(blob);

            const newImageUrl = await storageRef.getDownloadURL();

            // Update Firestore document with new image URL
            await itemRef.update({ imageUrl: newImageUrl });

            console.log('Image successfully updated!');
        }
        console.log('Document successfully updated!');
        navigation.goBack(); // Navigate back to the ListPage after updating
    } catch (error) {
        console.error('Error updating document: ', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
        <View style={styles.garis}>
            <Header headerTitle="   Edit Barang"/>
        </View>
        <View style={styles.imageContainer}>
            {selectedImage ? (
            <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
            ) : imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.existingImage} />
            ) : (
                <Text> Loading Image </Text>
            )}
            <TouchableOpacity onPress={handleSelectImage}>
                <View style={styles.boxSelect}>
                    <Text style={styles.submit}>Select Image</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.box}>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <ScrollView>
                    <Text style={styles.name}>Serial Number:</Text>
                    <View style={styles.line}>
                        <TextInput
                            style={styles.input}
                            value={nomor}
                            onChangeText={setNomor}
                        />
                    </View>

                    <Text style={styles.name}>Merk:</Text>
                    <View style={styles.line}>
                        <TextInput
                            style={styles.input}
                            value={merk}
                            onChangeText={setMerk}
                        />
                    </View>

                    <Text style={styles.name}>Tipe/Seri:</Text>
                    <View style={styles.line}>
                        <TextInput
                            style={styles.input}
                            value={type}
                            onChangeText={setType}
                        />
                    </View>

                    <Text style={styles.name}>Jenis:</Text>
                    <View style={styles.line}>
                        <TextInput
                            style={styles.input}
                            value={jenis}
                            onChangeText={setJenis}
                        />
                    </View>

                    <Text style={styles.name}>Tanggal Operasi:</Text>
                    <View style={styles.line}>
                        <TextInput
                            style={styles.input}
                            value={tanggalOperasi}
                            onChangeText={setTanggalOperasi}
                        />
                    </View>

                    <Text style={styles.name}>Unit:</Text>
                    <View style={styles.line}>
                        <TextInput
                            style={styles.input}
                            value={unit}
                            onChangeText={setUnit}
                        />
                    </View>

                    <Text style={styles.name}>Lokasi Perangkat:</Text>
                    <View style={styles.line}>
                        <TextInput
                            style={styles.input}
                            value={lokasiPenyimpanan}
                            onChangeText={setLokasiPenyimpanan}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>

        <TouchableOpacity style={styles.BoxSubmit} onPress={() => handleUpdate(itemId)}>
            <Text style={styles.submit}>Save Changes</Text>
        </TouchableOpacity>
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
    imageContainer: {
        alignItems: 'center',
        marginVertical: 3,
        width: "100%",
    },
    selectedImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    existingImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    box: {
        backgroundColor: "#013CBE",
        position: "absolute",
        width: 360,
        height: 450,
        left: 16,
        top: 350,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 1
    },
    name: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        paddingVertical: 9,
        paddingHorizontal: 23,
        marginBottom: 10,
    },
    line: {
        width: 329,
        height: 1,
        marginLeft: 25,
        backgroundColor: "#BCBCBC",
        borderRadius: 1,
    },
    BoxSubmit: {
        position: "absolute",
        width: 240,
        height: 50,
        top: 200,
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
        position:"absolute",
        top: -30,
        height: 40,
        width: 351,
        textAlign: "left",
        borderWidth: 1,
        borderColor:"transparent",
        color:"white"
    },
    boxSelect: {
        width: 180,
        height: 45,
        backgroundColor: "#FFE4C4",
        borderRadius: 25,
        textAlign: "center",
        justifyContent: "center",
        marginTop: -5
    }
});

export default EditPage;
