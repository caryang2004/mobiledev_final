import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SavedList from './components/SavedList';
import itemsData from '../../data/items.json';
import itemListsData from '../../data/itemlists.json';
import * as FileSystem from 'expo-file-system';

export default function ListScreen() {
  const [items, setItems] = useState(itemsData);
  const [productType, setProductType] = useState('');
  const [store, setStore] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [customLists, setCustomLists] = useState(itemListsData);
  const [selectedList, setSelectedList] = useState('');
  const [filterCaption, setFilterCaption] = useState('');

  useEffect(() => {
    loadCustomLists();
  }, []);

  const loadCustomLists = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'itemlists.json';
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      
      if (fileInfo.exists) {
        const fileContents = await FileSystem.readAsStringAsync(fileUri);
        setCustomLists(JSON.parse(fileContents));
      } else {
        // If the file doesn't exist, use the default data and create the file
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(itemListsData));
        setCustomLists(itemListsData);
      }
    } catch (error) {
      console.error('Error loading custom lists:', error);
    }
  };

  const saveCustomLists = async (newLists) => {
    try {
      const fileUri = FileSystem.documentDirectory + 'itemlists.json';
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newLists));
    } catch (error) {
      console.error('Error saving custom lists:', error);
    }
  };

  const filterItems = () => {
    let filteredItems = itemsData;
    let filterDescription = [];

    if (productType) {
      filteredItems = filteredItems.filter(item => item.productType === productType);
      filterDescription.push(`Type: ${productType}`);
    }
    if (store) {
      filteredItems = filteredItems.filter(item => item.store === store);
      filterDescription.push(`Store: ${store}`);
    }
    if (minPrice !== '') {
      filteredItems = filteredItems.filter(item => item.price >= parseFloat(minPrice));
      filterDescription.push(`Min Price: $${minPrice}`);
    }
    if (maxPrice !== '') {
      filteredItems = filteredItems.filter(item => item.price <= parseFloat(maxPrice));
      filterDescription.push(`Max Price: $${maxPrice}`);
    }

    setItems(filteredItems);
    setFilterCaption(filterDescription.join(', '));
  };

  const handleSaveList = (listName) => {
    const newList = {
      id: customLists.length + 1,
      name: listName,
      criteria: {
        productType,
        store,
        minPrice,
        maxPrice,
      },
    };
    const updatedLists = [...customLists, newList];
    setCustomLists(updatedLists);
    saveCustomLists(updatedLists);
    Alert.alert('Success', `List "${listName}" saved successfully!`);
  };

  const loadSavedList = (listId) => {
    const list = customLists.find(l => l.id.toString() === listId);
    if (list) {
      setProductType(list.criteria.productType || '');
      setStore(list.criteria.store || '');
      setMinPrice(list.criteria.minPrice || '');
      setMaxPrice(list.criteria.maxPrice || '');
      filterItems();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
      <Text>Size: {item.size}</Text>
      <Text>Type: {item.productType}</Text>
      <Text>Store: {item.store}</Text>
      <Text>Date: {item.recordDate}</Text>
    </View>
  );

  
  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <Picker
          selectedValue={productType}
          onValueChange={(itemValue) => setProductType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All Product Types" value="" />
          <Picker.Item label="Meat" value="meat" />
          <Picker.Item label="Milk" value="milk" />
          <Picker.Item label="Eat" value="eat" />
          <Picker.Item label="Electronic" value="electronic" />
          <Picker.Item label="Household Items" value="household items" />
        </Picker>
        <Picker
          selectedValue={store}
          onValueChange={(itemValue) => setStore(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All Stores" value="" />
          <Picker.Item label="Walmart" value="Walmart" />
          <Picker.Item label="Kroger" value="Kroger" />
          <Picker.Item label="Publix" value="Publix" />
          <Picker.Item label="Best Buy" value="Best Buy" />
          <Picker.Item label="Target" value="Target" />
          <Picker.Item label="FreshCo" value="FreshCo" />
        </Picker>
        <View style={styles.priceContainer}>
          <TextInput
            style={styles.priceInput}
            placeholder="Min Price"
            value={minPrice}
            onChangeText={setMinPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.priceInput}
            placeholder="Max Price"
            value={maxPrice}
            onChangeText={setMaxPrice}
            keyboardType="numeric"
          />
        </View>
        <Button title="Apply Filters" onPress={filterItems} />
      </View>
      <SavedList onSave={handleSaveList} />
      <View style={styles.savedListContainer}>
        <Text style={styles.label}>Load Saved List:</Text>
        <Picker
          selectedValue={selectedList}
          onValueChange={(itemValue) => {
            setSelectedList(itemValue);
            loadSavedList(itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select a saved list" value="" />
          {customLists.map(list => (
            <Picker.Item key={list.id} label={list.name} value={list.id.toString()} />
          ))}
        </Picker>
      </View>
      {filterCaption ? (
        <Text style={styles.filterCaption}>Filters applied: {filterCaption}</Text>
      ) : null}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No items found</Text>}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filtersContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  savedListContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterCaption: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    fontStyle: 'italic',
  },
});

