import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeleteItemScreen({ route }) {
  const {item} = route.params;
  const [theItem, setTheItem] = useState(item.id);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    AsyncStorage.getItem('items')
      .then(itemsList => {
        const itemsJson = JSON.parse(itemsList);
        let matchedItem = itemsJson.filter((i) => i.id === theItem);
        matchedItem = matchedItem[0];
        setTheItem(matchedItem);
      });
  }, [isFocused, navigation]);

  function renderItem() {
    const handleDeleteItem = async () => {
      let itemsJson = await AsyncStorage.getItem('items');
      itemsJson = JSON.parse(itemsJson);
      itemsJson = itemsJson.filter((i) => i.id !== theItem.id);
      await AsyncStorage.setItem('items', JSON.stringify(itemsJson));
      navigation.pop(2);
    };
    return (
    <>
      <Text style={styles.itemName}>Are you sure you want to delete {item.name}?</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.destructiveButton} onPress={handleDeleteItem}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Items</Text>
      {renderItem(theItem)}
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
    actionButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 48,
  },
  button: {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: "50%",
    backgroundColor: "#00bcff",
  },
  destructiveButton: {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff2000",
  },
  buttonText: {
    fontSize: "16px",
    color: "#fff",
    fontWeight: "bold",
  },
});

