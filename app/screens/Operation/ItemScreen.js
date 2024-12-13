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
import DeleteItemScreen from "./DeleteItemScreen";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemScreen = ({route}) => {
  const {item} = route.params;
  const [itemPrice, setItemPrice] = useState(0);
  const [itemSize, setItemSize] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemDate, setItemDate] = useState("");
  const [itemStore, setItemStore] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  useEffect(() => {
    AsyncStorage.getItem('items')
      .then(itemsList => {
        const itemsJson = JSON.parse(itemsList);
        let newItem = itemsJson.filter((i) => i.id === item.id);
        newItem = newItem[0];
        setItemPrice(newItem.price);
        setItemSize(newItem.size);
        setItemName(newItem.name);
        setItemType(newItem.productType);
        setItemDate(newItem.recordDate);
        setItemStore(newItem.store);
      });
  }, [isFocused, navigation]);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.circularIcon}></View>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditItem", {item:item})}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.destructiveButton} onPress={() => navigation.navigate("DeleteItemScreen", {item:item})}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemDesc}>Price: ${itemPrice.toFixed(2)}</Text>
        <Text style={styles.itemDesc}>Size: {itemSize}</Text>
        <Text style={styles.itemDesc}>Type: {itemType}</Text>
        <Text style={styles.itemDesc}>Date Recorded: {itemDate}</Text>
        <Text style={styles.itemDesc}>Store: {itemStore}</Text>
      </View>
    </ScrollView>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: "32px",
  },
  circularIcon: {
    marginHorizontal: "24px",
    backgroundColor: "tomato",
    width: "108px",
    height: "108px",
    borderRadius: "50%",
  },
  itemName: {
    width: "70%",
    margin: "auto",
    marginLeft: "6px",
    fontSize: 36,
    fontWeight: "bold",
    overflow: "hidden",
  },
  body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  actionButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
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
  itemDesc: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: -10,
    marginHorizontal: 0,
    fontSize: 18,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
