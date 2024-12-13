import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import DeleteItemScreen from "./DeleteItemScreen";

const EditItemScreenNew = ({route}) => {
  const {item} = route.params;
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [itemProductType, setItemProductType] = useState("");
  const [itemStore, setItemStore] = useState("");
  const [itemFavourite, setItemFavourite] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    setItemName(item.name);
    setItemPrice(item.price);
    setItemSize(item.size);
    setItemProductType(item.productType);
    setItemStore(item.store);
    setItemFavourite(item.favourite);
  }, [isFocused]);
  
  const handleSave = async () => {
    let itemsJson = await AsyncStorage.getItem('items');
    itemsJson = JSON.parse(itemsJson);
    itemsJson.map((theItem) => {
      if (theItem.id === item.id) {
        theItem.name = itemName;
        theItem.price = itemPrice;
        theItem.size = itemSize;
        theItem.productType = itemProductType;
        theItem.store = itemStore;
        theItem.favourite = itemFavourite;
        return;
        
      }
    });
    await AsyncStorage.setItem('items', JSON.stringify(itemsJson));
    navigation.navigate("Home");
  }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.body}>
        <Text style={styles.title}>Name:</Text>
        <TextInput style={styles.input} placeholder="Item Name" value={itemName} onChangeText={text => setItemName(text)}/>
        
        <Text style={styles.title}>Price:</Text>
        <TextInput style={styles.input} placeholder="Item Price" value={itemPrice} onChangeText={text => setItemPrice(text)}/>
        
        <Text style={styles.title}>Size:</Text>
        <TextInput style={styles.input} placeholder="Item Size" value={itemSize} onChangeText={text => setItemSize(text)}/>
        
        <Text style={styles.title}>Type:</Text>
        <TextInput style={styles.input} placeholder="Item Product Type" value={itemProductType} onChangeText={text => setItemProductType(text)}/>

        <Text style={styles.title}>Favourite?</Text>
        <input type="checkbox" style={styles.checkbox} checked={itemFavourite} onChange={() => setItemFavourite(!itemFavourite)}/>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.destructiveButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditItemScreenNew;

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
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
    margin: "auto",
    marginLeft: "6px",
    fontSize: 36,
    fontWeight: "bold",
  },
  body: {
    width: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 24,
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
    height: "32px",
    width: "50%",
    backgroundColor: "#00bcff",
  },
  destructiveButton: {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "32px",
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
  title: {
    paddingHorizontal: "16px",
    fontSize: 24,
    marginBottom: 12,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    paddingHorizontal: "16px",
    fontSize: 18,
    marginBottom: 64,
    padding: 2,
    borderBottomWidth: 1,
    borderColor: "#aaa",
  },
  checkbox: {
    height: 32,
    width: 32,
    marginLeft: 16,
  },
});
