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
  }, [isFocused]);

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
      <View style={styles.roundedSquareIcon}></View>
      <Text style={styles.itemName} numberOfLines={1}>
        {item.name || "No name"}
      </Text>
      <Text style={styles.itemDesc} numberOfLines={1}>
        {item.criteria.productType || "No product type"}
      </Text>
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
  section: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sectionHeader: {
    padding: 15,
    paddingBottom: 5,
    fontSize: "32px",
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
    width: "104px",
    height: "104px",
    borderRadius: "50%",
  },
  roundedSquareIcon: {
    margin: "auto",
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: "tomato",
    width: "104px",
    height: "104px",
    borderRadius: "25%",
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
});
