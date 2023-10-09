// Halaman ini digunakan untuk mencari barang dengan scan barcode
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { firebase } from '../config/Firebase';

const SearchScanPage = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    try {
      const itemRef = firebase.firestore().collection('list');
      const querySnapshot = await itemRef.where('nomor', '==', data).get();

      if (!querySnapshot.empty) {
        // Serial number found, navigate to DetailPage
        const itemId = querySnapshot.docs[0].id;
        navigation.navigate('detail', { itemId });
      } else {
        // Serial number not found, handle accordingly
        console.log('Serial number not found in Firestore');
      }
    } catch (error) {
      console.error('Error querying Firestore:', error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default SearchScanPage;