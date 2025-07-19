import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Video, ResizeMode } from 'expo-av';

const affirmations = [
  'You are worthy of love and success.',
  'Every day is a fresh start.',
  'I am becoming the best version of myself.',
  'I radiate confidence and positivity.',
  'I attract abundance in all forms.',
];

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
  const videoRef = useRef<Video | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState(
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-500));
  const [showOverlay, setShowOverlay] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  const handleLongPress = () => {
    const random = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[random]);
    setIsLongPressed(true);
    setShowOverlay(true);
    slideAnim.setValue(0);

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        delay: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        delay: 0,
        duration: 40000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsLongPressed(false);
      setShowOverlay(false);
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/catbg2.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Today's Affirmation</Text>
        <Text style={styles.afferText}>{currentAffirmation}</Text>

        <TouchableOpacity
          onLongPress={handleLongPress}
          onPressOut={handlePressOut}
          style={styles.longPressButton}
        >
          <Text style={styles.buttonText}>Long Press Me</Text>
        </TouchableOpacity>

        <View style={styles.extraContainer}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('category')}
          >
            <Text style={styles.categoryButtonText}>Customize</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showOverlay && (
        <Animated.View style={[styles.overlayScreen, { opacity: fadeAnim }]}>
          <Video
            ref={videoRef}
            source={require('../../assets/images/catbg5.jpeg')}
            style={StyleSheet.absoluteFill}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted
          />
          <Animated.View
            style={[
              styles.fullSlideContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.overlayText}>{currentAffirmation}</Text>
          </Animated.View>
        </Animated.View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 25,
    margin: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 150,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  afferText: {
    color: 'black',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 24,
  },
  longPressButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  extraContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  categoryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6A5ACD',
    borderRadius: 10,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlayScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  fullSlideContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
