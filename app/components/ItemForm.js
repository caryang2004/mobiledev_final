import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const ItemForm = ({ initialValues, onSubmit, onCancel }) => {
  const [itemName, setItemName] = useState(initialValues?.name || "");

  useEffect(() => {
    if (initialValues) {
      setItemName(initialValues.name);
    }
  }, [initialValues]);

  const handleSave = () => {
    if (itemName.trim() === "") {
      alert("Item name cannot be empty!");
      return;
    }
    onSubmit({ name: itemName });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={itemName}
        onChangeText={setItemName}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" color="red" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
});

export default ItemForm;
