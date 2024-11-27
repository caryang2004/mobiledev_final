import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import itemsData from "../../data/items.json";
import listsData from "../../data/itemlists.json";

export default function HomeScreen() {
  const [items, setItems] = useState([]);
  const [lists, setLists] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setItems(itemsData.filter((item) => item.favourite));
    setLists(listsData.filter((list) => list.id > 0));
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('AddItem')}
          title="+"
          color="blue"
        />
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.circularIcon}></View>
      <Text style={styles.itemName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.itemDesc} numberOfLines={1}>
        Price: ${item.price.toFixed(2)}
      </Text>
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
      <View>
        <Button
          title="Add Item"
          onPress={() => navigation.navigate("AddItem")}
        />
        {/* <Button
          title="Edit Item"
          onPress={() => navigation.navigate("EditItem")}
        /> */}
        <Button
          title="Delete Item"
          onPress={() => navigation.navigate("DeleteItem")}
        />
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
});

