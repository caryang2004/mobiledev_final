import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function AddItemScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0.0);
  const [size, setSize] = useState('');
  const [productType, setProductType] = useState('');
  const [store, setStore] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleAddItem = async () => {
    const getDate = () => {
      const d = new Date();
      var date = d.getDate();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      return year + '-' + month + '-' + date;
    }
    let itemsJson = await AsyncStorage.getItem('items');
    itemsJson = JSON.parse(itemsJson);
    itemsJson.push({
        'id': Math.floor(Math.random() * (2 ** 32 - 1) + 1),
        'name': name,
        'price': price, 
        'size': size,
        'recordDate': getDate(),
        'productType': productType,
        'store': store,
        'favourite': isFavourite,
    });
    await AsyncStorage.setItem('items', JSON.stringify(itemsJson));
    navigation.pop(2);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
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
      <Button title="Add Item" onPress={handleAddItem} />
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

