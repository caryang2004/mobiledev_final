import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import ListScreen from "../screens/List/ListScreen";
import AddItemScreen from "../screens/Operation/AddItemScreen";
import EditItemScreen from "../screens/Operation/EditItemScreen";
import DeleteItemScreen from "../screens/Operation/DeleteItemScreen";

import ItemScreen from "../screens/Operation/ItemScreen";
import EditItemScreenNew from "../screens/Operation/EditItemScreenNew";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "List") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "AddItem") {
            iconName = focused ? "additem" : "additem-outline";
          } else if (route.name === "EditItem") {
            iconName = focused ? "edititem" : "edititem-outline";
          } else if (route.name === "DeleteItem") {
            iconName = focused ? "deleteitem" : "deleteitem-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="AddItem" component={AddItemScreen} />
      <Tab.Screen name="EditItem" component={EditItemScreen} />
      <Tab.Screen name="DeleteItem" component={DeleteItemScreen} />
      <Tab.Screen name="ItemScreen" component={ItemScreen} />
      <Tab.Screen name="EditItemScreenNew" component={EditItemScreenNew} />
    </Tab.Navigator>
  );
}
