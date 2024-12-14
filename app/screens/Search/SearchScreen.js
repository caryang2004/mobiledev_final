import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from './components/SearchBar';
import itemsData from '../../data/items.json';

// Write initial data if not already present
const writeItemsJson = async () => {
  const itemsJson = await AsyncStorage.getItem('items');
  if (itemsJson === null) {
    await AsyncStorage.setItem('items', JSON.stringify(itemsData));
    // alert("Wrote items data (delete this message before presentation)");
  }
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]); // State to store all items
  const [filteredItems, setFilteredItems] = useState([]); // State to store filtered items
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Load items from AsyncStorage
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

  // Initialize data when the screen loads
  useEffect(() => {
    writeItemsJson(); // Write initial data if not present
    loadItems(); // Load items into state
    // AsyncStorage.getItem('items')
    //   .then(itemsList => {
    //     const itemsJson = JSON.parse(itemsList);
    //     const filtered = itemsJson.filter((item) => item.favourite);
    //     if (filtered != items) {
    //       setItems(filtered);
    //     }
    //   });
  }, [isFocused, navigation]);

  // Filter items based on the search query
  useEffect(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered); // Update the filteredItems state
  }, [searchQuery, items]); // Re-run the filter when searchQuery or items change

  const handleEditItem = (item) => {
    navigation.navigate('EditItem', { item });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>Price: {item.price}</Text>
        <Text>Size: {item.size}</Text>
        <Text>Type: {item.productType}</Text>
        <Text>Store: {item.store}</Text>
        <Text>Date: {item.recordDate}</Text>
      </View>
      <TouchableOpacity onPress={() => handleEditItem(item)} style={styles.editButton}>
        <Ionicons name="pencil" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredItems}
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editButton: {
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

