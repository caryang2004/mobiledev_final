import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import itemsData from "../../data/items.json";
import listsData from "../../data/itemlists.json";
import { Ionicons } from '@expo/vector-icons';

const writeItemsJson = async () => {
  const itemsJson = await AsyncStorage.getItem('items');
  if (itemsJson === null) {
     await AsyncStorage.setItem('items', JSON.stringify(itemsData));
     alert("Wrote items data (delete this message before presentation)");
  }
}

const writeListsJson = async () => {
  const listsJson = await AsyncStorage.getItem('lists');
  if (listsJson === null) {
    await AsyncStorage.setItem('lists', JSON.stringify(listsData));
    alert("Wrote lists data (delete this message before presentation)");
  }
}

export default function HomeScreen() {
  const [items, setItems] = useState([]);
  const [lists, setLists] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  writeItemsJson();
  writeListsJson();


  useEffect(() => {
    AsyncStorage.getItem('items')
      .then(itemsList => {
        const itemsJson = JSON.parse(itemsList);
        const filtered = itemsJson.filter((item) => item.favourite);
        if (filtered != items) {
          setItems(filtered);
        }
      });
    AsyncStorage.getItem('lists')
      .then(listsList => {
        const listsJson = JSON.parse(listsList);
        const filtered = listsJson.filter((list) => list.id > 0);
        if (filtered != lists) {
          setLists(filtered);
        }
      });
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddItem')} style={styles.addButton}>
          <View style={styles.icon}>
            <Ionicons name="add-circle-outline" size={40} color="blue" />
          </View>
      </TouchableOpacity>
      ),
    });
  }, [isFocused, navigation]);
  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("ItemScreen", {item:item})}>
        <View style={styles.circularIcon}></View>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemDesc} numberOfLines={1}>Price: ${item.price.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderList = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("ItemListScreen", {theList:item})}>
        <View style={styles.roundedSquareIcon}></View>
        <Text style={styles.itemName} numberOfLines={1}>{item.name || "No name"}</Text>
        <Text style={styles.itemDesc} numberOfLines={1}>{item.criteria.productType || "No product type"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Favourites</Text>
        <View>
          <FlatList
            style={styles.horizontalFlatlist}
            horizontal={true}
            data={items}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No favourites found</Text>
            }
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Lists</Text>
        <View>
          <FlatList
            style={styles.horizontalFlatlist}
            horizontal={true}
            data={lists}
            renderItem={renderList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No lists found</Text>
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sectionHeader: {
    padding: 15,
    paddingBottom: 5,
    fontSize: 32,
    fontWeight: "bold",
  },
  horizontalFlatlist: {},
  itemContainer: {
    padding: 5,
    margin: 5,
    width: 180,
  },
  circularIcon: {
    margin: "auto",
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: "tomato",
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  roundedSquareIcon: {
    margin: "auto",
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: "tomato",
    width: 104,
    height: 104,
    borderRadius: 26,
  },
  itemName: {
    margin: "auto",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDesc: {
    margin: "auto",
    fontSize: 14,
    marginBottom: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  addButton: {
    marginRight: 15,
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
