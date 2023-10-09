const handleUpdate = async (itemId, newImage) => {
  try {
      const docRef = todoRef.doc(itemId);
      const docSnapshot = await docRef.get();
      const data = docSnapshot.data();

      // Delete the old image from Storage if there's an existing image
      if (data && data.imageUrl) {
          const oldImageUrl = data.imageUrl;
          const oldImageRef = firebase.storage().refFromURL(oldImageUrl);
          await oldImageRef.delete();
      }

      // Upload the new image to Storage
      const newImageUrl = await uploadImage(newImage, itemId);

      // Update the document data in Firestore with the new image URL
      await docRef.update({
          imageUrl: newImageUrl, // Update other fields as needed
      });

      console.log('Document successfully updated with new image!');
  } catch (error) {
      console.error('Error updating document with new image:', error);
  }
};

const uploadImage = async (imageUri, itemId) => {
  try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = `${itemId}.jpg`; // Modify the filename as needed
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${filename}`);
      
      await imageRef.put(blob);
      const imageUrl = await imageRef.getDownloadURL();

      return imageUrl;
  } catch (error) {
      console.error('Error uploading new image:', error);
      throw error;
  }
};
