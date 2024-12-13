import React, { useState, useEffect } from "react";
// import { NavigationContainer } from '@react-navigation/native';
// import MainTabNavigator from './navigation/MainTabNavigator';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Link, useNavigation } from "expo-router";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import itemsData from "./data/items.json";
import listsData from "./data/itemlists.json";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const writeItemsJson = async () => {
  const itemsJson = await AsyncStorage.getItem('items');
  if (itemsJson === null) {
     await AsyncStorage.setItem('items', JSON.stringify(itemsData));
     // alert("Wrote items data (delete this message before presentation)");
  }
}

const writeListsJson = async () => {
  const listsJson = await AsyncStorage.getItem('lists');
  if (listsJson === null) {
    await AsyncStorage.setItem('lists', JSON.stringify(listsData));
    // alert("Wrote lists data (delete this message before presentation)");
  }
}

export default function App() {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    writeItemsJson();
    writeListsJson();
  }, [isFocused, navigation]);

  return (
    // // <NavigationContainer>
    //   <MainTabNavigator />
    // // </NavigationContainer>

    <ImageBackground
      style={styles.background}
      source={{
        uri: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c",
      }} // Soft, professional background
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>Welcome Back!</Text>

          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Ionicons
              style={styles.icon}
              name="person-outline"
              size={24}
              color="#555"
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="lock-outline"
              size={24}
              color="#555"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("navigation/MainTabNavigator")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Link to Register */}
          <Link href="/register" style={styles.link}>
            Register Now
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent for modern effect
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    color: "#333",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
    marginTop: 10,
  },
});
