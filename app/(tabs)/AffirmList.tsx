import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';

type AffirmListRouteProp = RouteProp<RootStackParamList, 'AffirmList'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'AffirmList'>;

const mockAffirmations: { [key: string]: string[] } = {
  selfLove: [
    'I am worthy of love.',
    'I accept myself unconditionally.',
    'I love and respect myself.',
    'I am proud of who I am becoming.',
    'My self-worth is not defined by others.',
    'I radiate confidence and self-assurance.',
    'I am enough, just as I am.',
    'I choose to be kind to myself.',
    'I let go of self-judgment.',
    'I embrace my imperfections.',
    // Add more...
  ],
  success: [
    'I am capable of achieving greatness.',
    'Success flows to me effortlessly.',
    'I believe in my abilities.',
    'I turn my dreams into reality.',
    'Every step I take brings me closer to success.',
    'I am resilient in the face of challenges.',
    'My hard work always pays off.',
    'I attract opportunities for growth.',
    'I am committed to my goals.',
    'I am a magnet for success.',
    // Add more...
  ],
  health: [
    'My body is healthy and strong.',
    'I nourish myself with good habits.',
    'I make time to care for myself.',
    'I feel energized and full of life.',
    'I honor my body and mind.',
    'Every breath I take heals me.',
    'I choose foods that heal and nourish.',
    'I enjoy exercising and moving my body.',
    'I release tension with every exhale.',
    'I prioritize my well-being every day.',
    // Add more...
  ],
  gratitude: [
    'I am thankful for the small joys in life.',
    'Gratitude fills my heart every day.',
    'I appreciate all the good around me.',
    'Each moment is a gift.',
    'I focus on the blessings in my life.',
    'I am grateful for the love I receive.',
    'I give thanks freely and often.',
    'I am content with what I have.',
    'Every day brings new things to be grateful for.',
    'Gratitude lifts my spirit.',
    // Add more...
  ],
  confidence: [
    'I believe in myself and my abilities.',
    'I speak with confidence and clarity.',
    'I trust myself to make good decisions.',
    'I am brave, bold, and beautiful.',
    'Confidence comes naturally to me.',
    'I face challenges with courage.',
    'I am not afraid to be myself.',
    'I grow more confident each day.',
    'I stand tall in my truth.',
    'I am proud of who I am.',
    // Add more...
  ],
  other: [],
};

const AffirmList = () => {
  const route = useRoute<AffirmListRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { selectedCategories, customAffirmations = [] } = route.params;
  const [favorites, setFavorites] = useState<string[]>([]);

  // Toggle the favorite status of an affirmation
  const toggleFavorite = (affirmation: string) => {
    setFavorites((prev) =>
      prev.includes(affirmation)
        ? prev.filter((a) => a !== affirmation)
        : [...prev, affirmation]
    );
  };

  // Navigate to the Affirmations screen
  const goToAffirmationsScreen = () => {
    navigation.navigate('AffirmList', {
      selectedCategories,
      customAffirmations,
      customInput: '',
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg9.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Affirmations</Text>

        {selectedCategories.map((cat) => {
          const key = cat.toLowerCase();
          const affirmations =
            key === 'other'
              ? customAffirmations
              : mockAffirmations[key] || [];

          // Only render the category if it has affirmations
          if (affirmations.length === 0) return null;

          return (
            <View key={key} style={styles.categoryGroup}>
              <Text style={styles.categoryLabel}>{cat}</Text>
              {affirmations.map((item, index) => (
                <View key={index} style={styles.affirmationItem}>
                  <Text style={styles.affirmationText}>• {item}</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(item)}>
                    <Ionicons
                      name={favorites.includes(item) ? 'heart' : 'heart-outline'}
                      size={24}
                      color="crimson"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        })}

        {/* Next button to navigate to the next screen */}
        <TouchableOpacity style={styles.nextButton} onPress={goToAffirmationsScreen}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  categoryGroup: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2F4F4F',
  },
  affirmationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  affirmationText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    paddingRight: 10,
  },
  nextButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4682B4',
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AffirmList;
