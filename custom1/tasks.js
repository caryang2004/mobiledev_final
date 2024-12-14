import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getPosts } from "../custom1/api";

const Tasks = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getPosts();
      console.log("Fetched data:", result); // Debugging log to check data structure
      setData(result);
    } catch (error) {
      console.error("Error in fetching data", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {data.length > 0 ? (
        data.map((task) => (
          <View key={task.id} style={styles.taskContainer}>
            <Text style={styles.taskName}>Name: {task.name}</Text>
            <Text style={styles.taskTitle}>Password: {task.title}</Text>
            <Text style={styles.taskId}>Id: {task.id}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.loadingText}>Loading tasks...</Text> // Message if data is empty
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  taskContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow for Android
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  taskTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  taskId: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
});

export default Tasks;
