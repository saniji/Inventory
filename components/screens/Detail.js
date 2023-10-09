// Halaman ini merupakan halaman yang berfungsi untuk mengatur detail barang
import React, { useState, useEffect } from 'react';
import { View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image
} from 'react-native';

import SafeViewAndroid from '../SafeViewAndroid';
import Header from '../Header'; 
import { firebase } from '../config/Firebase';

const DetailPage = ({ route }) => {
  const { itemId } = route.params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [formattedTimestamp, setFormattedTimestamp] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the item details from Firestore based on the item ID
    const getItemDetails = async () => {
      try {
        const itemRef = firebase.firestore().collection('list').doc(itemId);
        const snapshot = await itemRef.get();

        if (snapshot.exists) {
          const data = snapshot.data();
          setItem(data);
          setImageUrl(data.imageUrl);

          if (data.createdBy) {
            const userSnapshot = await firebase.firestore().collection('list').doc(data.createdBy).get();
            if (userSnapshot.exists) {
              const userData = userSnapshot.data();
              setUser(userData);
            } else {
              setUser(null);
            }
          }

          const timestamp = data.createdAt;
          if (timestamp && timestamp.seconds) {
            const formatDate = new Date(timestamp.seconds * 1000).toLocaleString();
            setFormattedTimestamp(formatDate);
          }
        } else {
          setItem(null);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setLoading(false);
      }
    };
    getItemDetails();
  }, [itemId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Item not found.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
      <View style={styles.garis}>
          <Header headerTitle="   Detail Barang"/>
      </View>
      <View style={styles.boxImage}>
        {imageUrl && (
          <Image
            style={styles.image}
            source={{uri: imageUrl}}
          />
        )}
      </View>
      <View style={styles.box}>
        <Text style={styles.name}>User Input</Text>
        <Text style={styles.cek}>{item.createdByEmail}</Text>
        <View style={styles.line}></View>

        <Text style={styles.name}>Serial Number</Text>
        <Text style={styles.cek}>{item.nomor}</Text>
        <View style={styles.line}></View>

        <Text style={styles.name}>Merk</Text>
        <Text style={styles.cek}>{item.merk}</Text>
        <View style={styles.line}></View>

        <Text style={styles.name}>Tipe/Seri</Text>
        <Text style={styles.cek}>{item.type}</Text>
        <View style={styles.line}></View>

        <Text style={styles.name}>Jenis</Text>
        <Text style={styles.cek}>{item.jenis}</Text>
        <View style={styles.line}></View>

        <Text style={styles.name}>Tanggal Operasi</Text>
        <Text style={styles.cek}>{item.tanggalOperasi}</Text>
        <View style={styles.line}></View>

        <Text style={styles.name}>Tanggal Input Data</Text>
        <Text style={styles.cek}>{formattedTimestamp}</Text>
        <View style={styles.line}></View>

        <Text style={styles.name}>Unit</Text>
        <Text style={styles.cek}>{item.unit}</Text>
        <View style={styles.line}></View>

        <Text style={styles.name}>Lokasi Perangkat</Text>
        <Text style={styles.cek}>{item.lokasiPenyimpanan}</Text>
        <View style={styles.line}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1
  },
  boxImage: {
    height: 200,
    width: 230,
    marginLeft: 75,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  box: {
    backgroundColor: "#013CBE",
    position: "absolute",
    width: 360,
    height: 520,
    left: 16,
    top: 280,
    borderRadius: 10,
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
    marginBottom: 2,
  },
  line: {
    width: 329,
    height: 1,
    marginLeft: 25,
    backgroundColor: "#BCBCBC",
    borderRadius: 1,
    marginBottom: -15,
  },
  cek: {
    color: "white",
    fontWeight:'bold',
    textAlign: 'center',
},

});

export default DetailPage;