import React, { useState, useEffect } from "react";
import AddItem from "./components/AddItem";
import * as FileSystem from "expo-file-system";

const AddItemScreen = ({ navigation }) => {
  const filePath = `${FileSystem.documentDirectory}items.json`;
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Set the component as mounted
    setIsMounted(true);

    // Cleanup function to prevent updates after unmount
    return () => setIsMounted(false);
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const data = await FileSystem.readAsStringAsync(filePath);
      const items = JSON.parse(data);
      items.push({ id: Date.now().toString(), ...newItem });

      if (isMounted) {
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(items));
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <AddItem onSubmit={handleAddItem} onCancel={() => navigation.goBack()} />
  );
};

export default AddItemScreen;
