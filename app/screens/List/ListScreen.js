  import React, { useState, useEffect } from 'react';
  import { View, Text, FlatList, StyleSheet, Button, Alert, TextInput } from 'react-native';
  import { Picker } from '@react-native-picker/picker';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import itemsData from '../../data/items.json';
  import itemListsData from '../../data/itemlists.json';
  import { useIsFocused } from '@react-navigation/native';

  // Write initial data if not already present
  const writeItemsJson = async () => {
    const itemsJson = await AsyncStorage.getItem('items');
    if (itemsJson === null) {
      await AsyncStorage.setItem('items', JSON.stringify(itemsData));
      alert("Wrote items data (delete this message before presentation)");
    }
  }

  // Write initial data if not already present
  const writeListsJson = async () => {
    const ListsJson = await AsyncStorage.getItem('lists');
    if (ListsJson === null) {
      await AsyncStorage.setItem('lists', JSON.stringify(itemListsData));
      alert("Wrote lists data (delete this message before presentation)");
    }
  }

  const SavedList = ({ onSave }) => {
    const [listName, setListName] = useState('');

    const handleSave = () => {
      if (listName.trim()) {
        onSave(listName);
        setListName('');
      } else {
        Alert.alert('Error', 'Please enter a valid list name.');
      }
    };

    return (
      <View style={styles.savedListContainer}>
        <TextInput
          style={styles.input}
          value={listName}
          onChangeText={setListName}
          placeholder="Enter list name"
        />
        <Button title="Save List" onPress={handleSave} />
      </View>
    );
  };

  export default function ListScreen() {
    const [items, setItems] = useState([]);
    const [lists, setLists] = useState([]);
    const [productType, setProductType] = useState('');
    const [store, setStore] = useState('');
    const [selectedList, setSelectedList] = useState('');
    const [filterCaption, setFilterCaption] = useState('');
    const isFocused = useIsFocused();

    // writeItemsJson(); // Load data
    // writeListsJson(); // Load data

    // useEffect(() => {
    //   loadlists();
    // }, []);
    
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        } else {
          setItems(itemsData); // Fallback to default data
        }
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };

    // Load lists from AsyncStorage
    const loadLists = async () => {
      try {
        const storedLists = await AsyncStorage.getItem('lists');
        if (storedLists) {
          setLists(JSON.parse(storedLists));
        } else {
          setLists([]); // Initialize with an empty array if nothing is stored
        }
      } catch (error) {
        console.error('Error loading lists:', error);
      }
    };

    // Load initial data
    useEffect(() => {
      writeItemsJson();
      writeListsJson();
      loadItems();
      loadLists();
    }, [isFocused]);

    // Save lists to AsyncStorage
    const saveLists = async (newLists) => {
      try {
        await AsyncStorage.setItem('lists', JSON.stringify(newLists));
        // console.log('Lists saved successfully', {lists});
      } catch (error) {
        console.error('Error saving lists:', error);
        Alert.alert('Error', 'Failed to save the list. Please try again.');
      }
    };

    const filterItems = async () => {
      try {
        // Reload the full list of items from AsyncStorage
        const storedItems = await AsyncStorage.getItem('items');
        let filteredItems = storedItems ? JSON.parse(storedItems) : itemsData; // Fallback to initial data

        let filterDescription = [];

        if (productType) {
          filteredItems = filteredItems.filter(item => item.productType === productType);
          filterDescription.push(`Type: ${productType}`);
        }
        if (store) {
          filteredItems = filteredItems.filter(item => item.store === store);
          filterDescription.push(`Store: ${store}`);
        }

        setItems(filteredItems); // Update the filtered items
        setFilterCaption(filterDescription.join(', '));
      } catch (error) {
        console.error('Error filtering items:', error);
      }
    };

    const handleSaveList = async (listName) => {
      const newList = {
        id: lists.length + 1,
        name: listName,
        criteria: {
          productType,
          store,
        },
      };
      const updatedLists = [...lists, newList];
      // console.log("1. handleSaveList");
      setLists(updatedLists);
      await saveLists(updatedLists);
      Alert.alert('Success', `List "${listName}" saved successfully!`);
    };

    const loadSavedList = (listId) => {
      const list = lists.find(l => l.id.toString() === listId);
      if (list) {
        setProductType(list.criteria.productType || '');
        setStore(list.criteria.store || '');
        filterItems();
      }
    };

    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>Price: {item.price}</Text>
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
          <Button title="Apply Filters" onPress={filterItems} />
        </View>
        <View style={styles.savedListInputContainer}>
          <Text style={styles.label}>Save List:</Text>
          <SavedList onSave={handleSaveList} />
        </View>
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
            {lists.map(list => (
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      marginBottom: 10,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginRight: 10,
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
    savedListInputContainer: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#f0f0f0',
    },
  });

