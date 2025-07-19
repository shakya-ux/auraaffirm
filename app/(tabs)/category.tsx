import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; // adjust path if needed
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const categories = [
  'Self Love',
  'Success',
  'Health',
  'Gratitude',
  'Confidence',
  'other',
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'category'>;

const CategoryScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customAffirmation, setCustomAffirmation] = useState('');
  const [customAffirmations, setCustomAffirmations] = useState<string[]>([]);

  const navigation = useNavigation<NavigationProp>();

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const handleAddAffirmation = () => {
    if (customAffirmation.trim()) {
      setCustomAffirmations(prev => [...prev, customAffirmation.trim()]);
      setCustomAffirmation('');
      Alert.alert('Success', 'New affirmation quote added successfully!', [
        { text: 'OK' },
      ]);
    }
  };

  const goToNext = () => {
    navigation.navigate('AffirmationsScreen', {
      selectedCategories,
      customAffirmations,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/catbg3.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={100}
      >
        <Text style={styles.title}>Select Categories:</Text>

        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => toggleCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategories.includes(category) && styles.selectedCategory,
            ]}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}

        {selectedCategories.includes('other') && (
          <View style={styles.customSection}>
            <Text style={styles.customTitle}>Your Custom Affirmation:</Text>

            <TextInput
              placeholder="Type your affirmation"
              placeholderTextColor="#888"
              value={customAffirmation}
              onChangeText={setCustomAffirmation}
              style={styles.input}
            />

            <TouchableOpacity onPress={handleAddAffirmation} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Affirmation</Text>
            </TouchableOpacity>

            {customAffirmations.map((affirm, index) => (
              <Text key={index} style={styles.customAffirmationItem}>
                • {affirm}
              </Text>
            ))}
          </View>
        )}

        <View style={{ height: 140 }} />
      </KeyboardAwareScrollView>

      <TouchableOpacity
        onPress={goToNext}
        style={styles.nextButton}
        disabled={selectedCategories.length === 0}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 140,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    width: 200,
  },
  selectedCategory: {
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderWidth: 2,
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
  },
  customSection: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  customTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    width: 250,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  customAffirmationItem: {
    color: 'black',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  nextButton: {
    position: 'absolute',
    bottom: 55,
    left: 20,
    right: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#4682B4',
    borderRadius: 8,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryScreen;
