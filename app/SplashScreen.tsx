import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";


const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    // Navigate to Home after 3 seconds
    setTimeout(() => {
      router.replace("/(tabs)"); // Redirects to Home Page
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Daily Affirmations</Text>
      <Text style={styles.subtitle}>Start your day with positivity</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});

export default SplashScreen;
