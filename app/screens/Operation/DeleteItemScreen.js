// import React, { useState, useEffect } from "react";
// import ConfirmationDialog from "../../components/ConfirmationDialog.js";
// import * as FileSystem from "expo-file-system";

// const DeleteItemScreen = ({ route, navigation }) => {
//   const filePath = `${FileSystem.documentDirectory}items.json`;

//   const [isMounted, setIsMounted] = useState(true);

//   useEffect(() => {
//     setIsMounted(true);
//     return () => setIsMounted(false);
//   }, []);

//   const handleDeleteItem = async () => {
//     try {
//       const data = await FileSystem.readAsStringAsync(filePath);
//       const items = JSON.parse(data);

//       const filteredItems = items.filter(
//         (item) => item.id !== route.params.itemId
//       );

//       if (isMounted) {
//         await FileSystem.writeAsStringAsync(
//           filePath,
//           JSON.stringify(filteredItems)
//         );

//         navigation.goBack();
//       }
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   return (
//     <ConfirmationDialog
//       message="Are you sure you want to delete this item?"
//       onConfirm={handleDeleteItem}
//       onCancel={() => navigation.goBack()}
//     />
//   );
// };

// export default DeleteItemScreen;


import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import itemsData from '../../data/items.json';

export default function DeleteItemScreen({ navigation }) {
  const [items, setItems] = useState(itemsData);

  const handleDeleteItem = (id) => {
    // Here you would typically delete the item from your data source
    // For now, we'll just remove it from the local state
    setItems(items.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
      <Text>Store: {item.store}</Text>
      <Button title="Delete" onPress={() => handleDeleteItem(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Items</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

