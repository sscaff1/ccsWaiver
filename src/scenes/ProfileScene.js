import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Input from '../components/Input';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export default function ProfileScene({ user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Player Card Info</Text>
      <Input placeholder="Name" value={user.name} />
      <Input placeholder="Email" value={user.email} />
      <Input placeholder="Phone Number" value={user.phone} />
      <RadioForm
        animation
        formHorizontal
        radio_props={GENDER_OPTIONS}
        initial={user.gender}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
  },
});
