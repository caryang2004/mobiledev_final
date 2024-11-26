// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";

// import HomeScreen from "../screens/Home/HomeScreen";
// import SearchScreen from "../screens/Search/SearchScreen";
// import ListScreen from "../screens/List/ListScreen";
// import AddItemScreen from "../screens/Operation/AddItemScreen";
// import EditItemScreen from "../screens/Operation/EditItemScreen";
// import DeleteItemScreen from "../screens/Operation/DeleteItemScreen";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen 
//         name="HomeScreen" 
//         component={HomeScreen} 
//         options={{ title: 'Home' }}
//       />
//       <Stack.Screen name="AddItem" component={AddItemScreen} />
//       <Stack.Screen name="DeleteItem" component={DeleteItemScreen} />
//       <Stack.Screen name="EditItem" component={EditItemScreen} />
//     </Stack.Navigator>
//   );
// }

// export default function MainTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Home") {
//             iconName = focused ? "home" : "home-outline";
//           } else if (route.name === "Search") {
//             iconName = focused ? "search" : "search-outline";
//           } else if (route.name === "List") {
//             iconName = focused ? "list" : "list-outline";
//           } 
//           // else if (route.name === "AddItem") {
//           //   iconName = focused ? "additem" : "additem-outline";
//           // } else if (route.name === "EditItem") {
//           //   iconName = focused ? "edititem" : "edititem-outline";
//           // } else if (route.name === "DeleteItem") {
//           //   iconName = focused ? "deleteitem" : "deleteitem-outline";
//           // }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "tomato",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeStack} 
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen name="Search" component={SearchScreen} />
//       <Tab.Screen name="List" component={ListScreen} />
//       {/* <Tab.Screen name="AddItem" component={AddItemScreen} />
//       <Tab.Screen name="EditItem" component={EditItemScreen} />
//       <Tab.Screen name="DeleteItem" component={DeleteItemScreen} /> */}
//     </Tab.Navigator>
//   );
// }

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import ListScreen from '../screens/List/ListScreen';
import AddItemScreen from '../screens/Operation/AddItemScreen';
import DeleteItemScreen from '../screens/Operation/DeleteItemScreen';
import EditItemScreen from '../screens/Operation/EditItemScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Stack.Screen name="AddItem" component={AddItemScreen} />
      <Stack.Screen name="DeleteItem" component={DeleteItemScreen} />
      <Stack.Screen name="EditItem" component={EditItemScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'List') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="List" component={ListScreen} />
    </Tab.Navigator>
  );
}

