import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, Alert, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { themes } from '../theme/theme';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import NetInfo from '@react-native-community/netinfo';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
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

    // геолокація
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      Alert.alert('Error', 'Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    const date = new Date().getTime();
    const latitude = currentLocation.coords.latitude;
    const longitude = currentLocation.coords.longitude;

    let finalPhotoUrl = imageUri;
    let synced = 0;

    // перевірка інтернету
    const netState = await NetInfo.fetch();
    if (netState.isConnected) {
      try {
        //  в Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(imageUri);
        finalPhotoUrl = cloudinaryUrl;
        synced = 1;
        console.log('✅ Фото успішно завантажене на Cloudinary');
      } catch (err) {
        console.warn('⚠️ Не вдалося завантажити фото на Cloudinary:', err.message);
      }
    } else {
      console.log('📴 Немає інтернету — зберігаємо локально');
    }

    // в SQLite
    try {
      await insertViolation(
        'New Violation',
        description,
        finalPhotoUrl,
        date,
        latitude,
        longitude
      );
      Alert.alert('✅ Успіх', synced ? 'Порушення синхронізовано!' : 'Порушення збережено локально!');
      setDescription('');
      setImageUri(null);
    } catch (err) {
      console.log('DB Save Error:', err);
      Alert.alert('❌ Помилка', 'Не вдалося зберегти порушення локально.');
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
