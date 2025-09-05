import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, Alert, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { themes } from '../theme/theme';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { insertViolation } from '../services/db';

export default function NewViolationScreen() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(themes[theme]);

  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Need camera permissions.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSaveViolation = async () => {
    if (!description || !imageUri) {
      Alert.alert('Error', 'Please provide a description and a photo.');
      return;
    }

    // Отримання геолокації
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      Alert.alert('Error', 'Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    const newViolation = {
      title: 'New Violation',
      description: description,
      photoUri: imageUri,
      date: new Date().getTime(),
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };

    try {
      await insertViolation(
        newViolation.title,
        newViolation.description,
        newViolation.photoUri,
        newViolation.date,
        newViolation.latitude,
        newViolation.longitude
      );
      Alert.alert('Success', 'Violation saved locally!');
      setDescription('');
      setImageUri(null);
    } catch (err) {
      console.log('DB Save Error:', err);
      Alert.alert('Error', 'Failed to save violation locally.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{t('new_violation')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('description_placeholder')}
        placeholderTextColor={themes[theme].text}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title={t('take_photo')} onPress={handleTakePhoto} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      <Button title={t('save_violation')} onPress={handleSaveViolation} />
    </ScrollView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    text: {
      color: theme.text,
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.text,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
      minHeight: 100,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginVertical: 15,
    },
  });
