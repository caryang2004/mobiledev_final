import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditItem = ({ route, navigation }) => {
  const { itemId, currentValue } = route.params; // Get the itemId and currentValue from route params
  const [itemText, setItemText] = useState(currentValue);

  useEffect(() => {
    // This useEffect will run when the component mounts
    if (!itemId) {
      Alert.alert("Error", "Item ID not found!");
      navigation.goBack(); // Go back if no itemId is found
    }
  }, [itemId]);

  // Save edited item to AsyncStorage
  const saveEditedItem = async () => {
    if (itemText.trim() !== "") {
      try {
        // Get the current list of items from AsyncStorage
        const itemsString = await AsyncStorage.getItem("items");
        if (itemsString) {
          const itemList = JSON.parse(itemsString);

          // Find and update the item in the list
          const updatedList = itemList.map((item) =>
            item.id === itemId ? { ...item, value: itemText } : item
          );

          // Save the updated list back to AsyncStorage
          await AsyncStorage.setItem("items", JSON.stringify(updatedList));

          // Go back to the previous screen
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error saving edited item:", error);
        Alert.alert("Error", "Failed to save changes. Please try again.");
      }
    } else {
      Alert.alert("Input Error", "Please enter a valid item.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Item</Text>
      <TextInput
        style={styles.input}
        value={itemText}
        onChangeText={setItemText}
        placeholder="Edit item"
      />
      <Button title="Save Changes" onPress={saveEditedItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default EditItem;
