import React, { useState, useEffect } from "react";
import EditItem from "./components/EditItem";
import * as FileSystem from "expo-file-system";

const EditItemScreen = ({ route, navigation }) => {
  const filePath = `${FileSystem.documentDirectory}items.json`;

  const [isMounted, setIsMounted] = useState(true);
  const [theItems, setItems] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleEditItem = async (updatedItem) => {
    try {
      const data = await FileSystem.readAsStringAsync(filePath);
      const items = JSON.parse(data);

      const index = items.findIndex((item) => item.id === route.params.itemId);
      items[index] = { id: route.params.itemId, ...updatedItem };
      setItems(items)

      if (isMounted) {
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(items));
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  return (
    <EditItem
      initialData={theItems}
      onSubmit={handleEditItem}
      onCancel={() => navigation.goBack()}
    />
  );
};

export default EditItemScreen;
