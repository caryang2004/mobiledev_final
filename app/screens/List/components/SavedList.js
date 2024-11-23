import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SavedList = ({ onSave }) => {
  const [listName, setListName] = useState('');

  const handleSave = () => {
    if (listName.trim()) {
      onSave(listName);
      setListName('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Save Custom List</Text>
      <TextInput
        style={styles.input}
        value={listName}
        onChangeText={setListName}
        placeholder="Enter list name"
      />
      <Button title="Save List" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
});

export default SavedList;

