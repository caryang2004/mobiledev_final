// import React, { useState, useEffect } from "react";
// import EditItem from "./components/EditItem";
// import * as FileSystem from "expo-file-system";

// const EditItemScreen = ({ route, navigation }) => {
//   const filePath = `${FileSystem.documentDirectory}items.json`;

//   const [isMounted, setIsMounted] = useState(true);
//   const [theItems, setItems] = useState([]);

//   useEffect(() => {
//     setIsMounted(true);
//     return () => setIsMounted(false);
//   }, []);

//   const handleEditItem = async (updatedItem) => {
//     try {
//       const data = await FileSystem.readAsStringAsync(filePath);
//       const items = JSON.parse(data);

//       const index = items.findIndex((item) => item.id === route.params.itemId);
//       items[index] = { id: route.params.itemId, ...updatedItem };
//       setItems(items)

//       if (isMounted) {
//         await FileSystem.writeAsStringAsync(filePath, JSON.stringify(items));
//         navigation.goBack();
//       }
//     } catch (error) {
//       console.error("Error editing item:", error);
//     }
//   };

//   return (
//     <EditItem
//       initialData={theItems}
//       onSubmit={handleEditItem}
//       onCancel={() => navigation.goBack()}
//     />
//   );
// };

// export default EditItemScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import itemsData from '../../data/items.json';

export default function EditItemScreen({ navigation }) {
  const [items] = useState(itemsData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [productType, setProductType] = useState('');
  const [store, setStore] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);

  const handleSelectItem = (itemId) => {
    const item = items.find(i => i.id === parseInt(itemId));
    if (item) {
      setSelectedItem(item);
      setName(item.name);
      setPrice(item.price.toString());
      setSize(item.size);
      setProductType(item.productType);
      setStore(item.store);
      setIsFavourite(item.favourite);
    }
  };

  const handleSaveItem = () => {
    if (selectedItem) {
      const updatedItem = {
        ...selectedItem,
        name,
        price: parseFloat(price),
        size,
        productType,
        store,
        favourite: isFavourite,
      };
      console.log('Updated item:', updatedItem);
      // Here you would typically update the item in your data source
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Item</Text>
      <Picker
        selectedValue={selectedItem ? selectedItem.id.toString() : ''}
        onValueChange={handleSelectItem}
        style={styles.picker}
      >
        <Picker.Item label="Select an item to edit" value="" />
        {items.map(item => (
          <Picker.Item key={item.id} label={item.name} value={item.id.toString()} />
        ))}
      </Picker>
      {selectedItem && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Size"
            value={size}
            onChangeText={setSize}
          />
          <Picker
            selectedValue={productType}
            onValueChange={(itemValue) => setProductType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Product Type" value="" />
            <Picker.Item label="Meat" value="meat" />
            <Picker.Item label="Milk" value="milk" />
            <Picker.Item label="Bread" value="bread" />
            <Picker.Item label="Electronic" value="electronic" />
            <Picker.Item label="Household Items" value="household items" />
          </Picker>
          <Picker
            selectedValue={store}
            onValueChange={(itemValue) => setStore(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Store" value="" />
            <Picker.Item label="Walmart" value="Walmart" />
            <Picker.Item label="Kroger" value="Kroger" />
            <Picker.Item label="Publix" value="Publix" />
            <Picker.Item label="Best Buy" value="Best Buy" />
            <Picker.Item label="Target" value="Target" />
            <Picker.Item label="FreshCo" value="FreshCo" />
          </Picker>
          <View style={styles.favouriteContainer}>
            <Text style={styles.favouriteLabel}>Favourite</Text>
            <Switch
              value={isFavourite}
              onValueChange={setIsFavourite}
            />
          </View>
          <Button title="Save Changes" onPress={handleSaveItem} />
        </View>
      )}
    </ScrollView>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  favouriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  favouriteLabel: {
    fontSize: 16,
  },
});



