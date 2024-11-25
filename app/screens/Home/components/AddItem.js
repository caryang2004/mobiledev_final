import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-web';

const AddItem = ({ value }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={value}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={value}
        inputMode='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder="Size"
        value={value}
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={value}
      />
      <TextInput
        style={styles.input}
        placeholder="Store"
        value={value}
      />
      <Button
        style={styles.button}
        title="Add Item"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f0f0f0',
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  button: {
  },
});

export default AddItem;