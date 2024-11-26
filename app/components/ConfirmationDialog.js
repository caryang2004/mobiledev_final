import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Delete" onPress={onConfirm} />
        <Button title="Cancel" color="red" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  message: { fontSize: 16, textAlign: "center", marginBottom: 16 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-around" },
});

export default ConfirmationDialog;
