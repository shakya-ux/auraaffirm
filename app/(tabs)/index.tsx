import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // ✅ Import types

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation<NavigationProp>();  

  return (
    <ImageBackground
      source={require('../../assets/images/bg7.jpeg')}  // Background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Logo Image */}
        <Image
          source={require('../../assets/images/logo.png')}  // Replace with your logo's path
          style={styles.logo}
        />
        
        <Text style={styles.title}>Welcome!{'\n'} Let’s start your journey to positivity and self-growth.</Text>

        <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isPressed && styles.buttonPressed]}
        onPress={() => {
          setIsPressed(!isPressed); // Toggle button color
          navigation.navigate('login'); // ✅ Navigate on press
        }}
      >
        <Text style={[styles.buttonText, isPressed && styles.textPressed]}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
    
   
      </View>
    </ImageBackground>
  );
};

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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 1,
    marginTop:70,
    color: "black",
    textAlign: "center",
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#f5cfca', // Change background on press
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPressed: {
    color: 'black', // Change text color on press
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop:60
  },
  
});

export default Home;
