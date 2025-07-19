import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../(tabs)/index'; // Import your Home screen
import Login from './login';  // Corrected component name to Login
import Category from '../(tabs)/category';  // Corrected component name to Category
import HomeScreen from '../(tabs)/HomeScreen';
import AffirmationsScreen from '../(tabs)/AffirmationsScreen';
import AffirmList from '../(tabs)/AffirmList';  // Make sure the path is correct

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />  {/* Corrected name */}
        <Stack.Screen name="Category" component={Category} />  {/* Corrected name */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Affirmations" component={AffirmationsScreen} />
        <Stack.Screen name="AffirmList" component={AffirmList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
