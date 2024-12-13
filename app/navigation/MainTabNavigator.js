
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import ListScreen from '../screens/List/ListScreen';
import AddItemScreen from '../screens/Operation/AddItemScreen';
import DeleteItemScreen from '../screens/Operation/DeleteItemScreen';
// import EditItemScreen from '../screens/Operation/EditItemScreen';

import ItemScreen from "../screens/Operation/ItemScreen";
import ItemListScreen from "../screens/Operation/ItemListScreen";
import EditItemScreenNew from "../screens/Operation/EditItemScreenNew";

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
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      <Stack.Screen name="ItemListScreen" component={ItemListScreen} />
      <Stack.Screen name="EditItem" component={EditItemScreenNew} />
      <Stack.Screen name="DeleteItemScreen" component={DeleteItemScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SearchScreen" 
        component={SearchScreen} 
        options={{ title: 'Search' }}
      />
      <Stack.Screen name="EditItem" component={EditItemScreenNew} />
    </Stack.Navigator>
  );
}

function ListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListScreen" 
        component={ListScreen} 
        options={{ title: 'List' }}
      />
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
      <Tab.Screen 
        name="Search" 
        component={SearchStack}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Search', { screen: 'SearchScreen' });
          },
        })}
      />
      <Tab.Screen 
        name="List" 
        component={ListStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
