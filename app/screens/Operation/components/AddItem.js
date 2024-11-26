import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const AddItem = ({ onSubmit, onCancel }) => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Description"
        value={itemDescription}
        onChangeText={setItemDescription}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add"
          onPress={() => onSubmit({ itemName, itemDescription })}
        />
        <Button title="Cancel" color="red" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
});

export default AddItem;
