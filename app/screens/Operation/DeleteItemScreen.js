import React, { useState, useEffect } from "react";
import ConfirmationDialog from "../../components/ConfirmationDialog.js";
import * as FileSystem from "expo-file-system";

const DeleteItemScreen = ({ route, navigation }) => {
  const filePath = `${FileSystem.documentDirectory}items.json`;

  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleDeleteItem = async () => {
    try {
      const data = await FileSystem.readAsStringAsync(filePath);
      const items = JSON.parse(data);

      const filteredItems = items.filter(
        (item) => item.id !== route.params.itemId
      );

      if (isMounted) {
        await FileSystem.writeAsStringAsync(
          filePath,
          JSON.stringify(filteredItems)
        );

        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <ConfirmationDialog
      message="Are you sure you want to delete this item?"
      onConfirm={handleDeleteItem}
      onCancel={() => navigation.goBack()}
    />
  );
};

export default DeleteItemScreen;
