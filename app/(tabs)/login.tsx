import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'login'>;

const AnotherPage = () => {
  const navigation = useNavigation<NavigationProp>();

  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = () => {
    if (mode === 'signUp' && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    navigation.navigate('HomeScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../../assets/images/catbg5.jpeg')}
          style={styles.background}
          resizeMode="cover"
        >
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.centerWrapper}>
              <View style={styles.overlayContainer}>
                <Text style={styles.title}>
                  {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="gray"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                {mode === 'signIn' && (
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                )}

                {mode === 'signUp' && (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      placeholderTextColor="gray"
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      placeholderTextColor="gray"
                      value={lastName}
                      onChangeText={setLastName}
                    />
                    <View style={styles.radioGroup}>
                      <Text style={styles.radioLabel}>Gender:</Text>
                      <View style={styles.radioButtons}>
                        {['Male', 'Female', 'Other'].map((g) => (
                          <TouchableOpacity
                            key={g}
                            style={[
                              styles.radioButton,
                              gender === g && styles.selectedRadio,
                            ]}
                            onPress={() => setGender(g)}
                          >
                            <Text style={styles.radioButtonText}>{g}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.datePicker}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Text style={styles.dateText}>
                        {dob ? `Date of Birth: ${dob}` : 'Select Date of Birth'}
                      </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                      <DateTimePicker
                        value={dob ? new Date(dob) : new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                        maximumDate={new Date()}
                        onChange={onChangeDate}
                      />
                    )}

                    <TextInput
                      style={styles.input}
                      placeholder="Create Password"
                      placeholderTextColor="gray"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor="gray"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                    />
                  </>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>
                    {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}>
                  <Text style={styles.toggleText}>
                    {mode === 'signIn'
                      ? "Don't have an account? Sign Up"
                      : 'Already have an account? Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  overlayContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  datePicker: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  toggleText: {
    color: 'white',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  radioGroup: {
    width: '100%',
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: 'lightgreen',
  },
  radioButtonText: {
    color: 'black',
  },
});

export default AnotherPage;
