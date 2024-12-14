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
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemListScreen = ({route}) => {
  const {theList} = route.params;
  const [items, setItems] = useState([]);
  const [lists, setLists] = useState([]);
  const [productType, setProductType] = useState('');
  const [store, setStore] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();


  useEffect(() => {
    AsyncStorage.getItem('lists')
        .then(listsList => {
          const listsJson = JSON.parse(listsList);
          let matchedList = listsJson.filter((l) => l.name === theList.name);
          // console.log("matchedList", {matchedList});
          if (matchedList.length === 1) {
            const list = matchedList[0];
            AsyncStorage.getItem('items')
              .then(itemsList => {
                const itemsJson = JSON.parse(itemsList);
                let out = [];
                for (let i = 0; i < itemsJson.length; i++) {
                  let theItem = itemsJson[i];
                  let productType = list.criteria.productType;
                  let store = list.criteria.store;
                  // console.log("productType", {productType});
                  // console.log("store", {store});
                  if (productType.length > 0 && theItem.productType !== productType) {
                    continue;
                  } else if (store.length > 0 && theItem.store !== store) {
                    continue;
                  }
                  // alert("Add item: " + theItem.name);
                  out[out.length] = <Text style={styles.itemEntry}>Name: {"\t"}{theItem.name}{"\n"}Price: {"\t"}{theItem.price}{"\n"}Type: {"\t"}{theItem.productType}{"\n"}Store: {"\t"}{theItem.store}{"\n"}Date: {"\t"}{theItem.recordDate}{"\n"}</Text>

                }
                if (out.length > 0) {
                  setItems(out);
                } else {
                  setItems([<Text style={styles.itemEntry}>No items found.</Text>]);
                }
              });
          } else {
            alert("No matched list");
          }
        });
  }, [isFocused, navigation]);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.circularIcon}></View>
        <Text style={styles.itemName} numberOfLines={1}>{theList.name}</Text>
      </View>
      <View style={styles.body}>
        {items}
      </View>
    </ScrollView>
  );
};

export default ItemListScreen;

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
    paddingVertical: 32,
    marginBottom: 8,
  },
  circularIcon: {
    marginHorizontal: "24px",
    backgroundColor: "tomato",
    width: 104,
    height: 104,
    borderRadius: 26,
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
    marginBottom: "32px",
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
  itemEntry: {
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
