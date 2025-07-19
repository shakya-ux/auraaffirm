import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  ImageBackground
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootStackParamList } from '../types';
import { Picker } from '@react-native-picker/picker';
import type { StackNavigationProp } from '@react-navigation/stack';

type AffirmationsRouteProp = RouteProp<RootStackParamList, 'AffirmationsScreen'>;

const AffirmationsScreen = () => {
  const route = useRoute<AffirmationsRouteProp>();
  const { selectedCategories } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [frequency, setFrequency] = useState<'hourly' | 'daily' | 'weekly' | 'weekends'>('daily');
  const [hourInterval, setHourInterval] = useState('1');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const showConfirmation = () => {
    let message = `You will receive affirmations from:\n\n${selectedCategories.join(', ')}\n\n`;

    switch (frequency) {
      case 'hourly':
        message += `Every ${hourInterval} hour(s).`; break;
      case 'daily':
        message += `Daily at ${selectedTime.toLocaleTimeString()}.`; break;
      case 'weekly':
        message += `Every ${selectedDay} at ${selectedTime.toLocaleTimeString()}.`; break;
      case 'weekends':
        message += `On weekends at ${selectedTime.toLocaleTimeString()}.`; break;
    }

    Alert.alert('Confirmation', message, [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('AffirmList', {
            selectedCategories,
            customAffirmations: route.params.customAffirmations || [],
            customInput: ''
          });
        },
      },
    ]);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg9.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        
        {/* Back Button */}
       


        <Text style={styles.title}>Set Notification Frequency</Text>

        <Text style={styles.selectedCategoriesLabel}>Selected Categories:</Text>
        <Text style={styles.selectedCategoriesText}>
          {selectedCategories.join(', ')}
        </Text>

        <Text style={styles.label}>Frequency:</Text>
        <Picker
          selectedValue={frequency}
          onValueChange={(itemValue) => setFrequency(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Hourly" value="hourly" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Weekends" value="weekends" />
        </Picker>

        {frequency === 'hourly' && (
          <>
            <Text style={styles.label}>Select Hour Interval:</Text>
            <Picker
              selectedValue={hourInterval}
              onValueChange={(value) => setHourInterval(value)}
              style={styles.picker}
            >
              {[...Array(12)].map((_, i) => (
                <Picker.Item key={i + 1} label={`${i + 1} Hour`} value={`${i + 1}`} />
              ))}
            </Picker>
          </>
        )}

        {(frequency === 'daily' || frequency === 'weekly' || frequency === 'weekends') && (
          <>
            {frequency === 'weekly' && (
              <>
                <Text style={styles.label}>Select Day:</Text>
                <Picker
                  selectedValue={selectedDay}
                  onValueChange={(value) => setSelectedDay(value)}
                  style={styles.picker}
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <Picker.Item key={day} label={day} value={day} />
                  ))}
                </Picker>
              </>
            )}

            <Text style={styles.label}>Select Time:</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timeButton}>
              <Text style={styles.timeButtonText}>
                {selectedTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                textColor="black"
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selected) => {
                  setShowTimePicker(false);
                  if (selected) setSelectedTime(selected);
                }}
              />
            )}
          </>
        )}

        <TouchableOpacity style={styles.confirmButton} onPress={showConfirmation}>
          <Text style={styles.confirmText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity 
  style={styles.backButton} 
  onPress={() => navigation.navigate('category')} // Navigate specifically to Category screen
>
  <Text style={styles.backButtonText}>Back</Text>
</TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: 'black',
    marginTop:10,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedCategoriesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
  },
  
  selectedCategoriesText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  picker: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    marginBottom: 15,
    borderRadius: 10,
    width:'50%',
    alignSelf:'center',
  },
  timeButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  timeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#32CD32',
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AffirmationsScreen;
