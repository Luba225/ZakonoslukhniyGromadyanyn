import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { fetchViolations } from '../services/db';
import { ThemeContext } from '../context/ThemeContext';
import { themes } from '../theme/theme';
import { useTranslation } from 'react-i18next';
import { deleteViolation } from '../services/db';

export default function ViolationsListScreen() {
  const [violations, setViolations] = useState([]);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const styles = getStyles(themes[theme]);

  useEffect(() => {
    const loadViolations = async () => {
      try {
        const data = await fetchViolations();
        setViolations(data);
        console.log('📦 Отримано локальні порушення:', data);
      } catch (error) {
        console.error('❌ Помилка при завантаженні порушень:', error);
      }
    };

    loadViolations();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      t('confirm_delete_title') || 'Підтвердження',
      t('confirm_delete_message') || 'Ви впевнені, що хочете видалити це порушення?',
      [
        { text: t('cancel') || 'Скасувати', style: 'cancel' },
        {
          text: t('delete') || 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteViolation(id);
              setViolations((prev) => prev.filter((v) => v.id !== id));
              console.log('🗑️ Видалено порушення ID:', id);
            } catch (err) {
              console.error('❌ Помилка видалення:', err);
              Alert.alert('Помилка', 'Не вдалося видалити порушення.');
            }
          },
        },
      ]
    );
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.photoUri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.meta}>
          📍 {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}
        </Text>
        <Text style={styles.meta}>
          🕒 {new Date(item.date).toLocaleString()}
        </Text>
        <Text style={[styles.meta, { color: item.isSynced ? 'green' : 'red' }]}>
          {item.isSynced ? '✅ Синхронізовано' : '⚠️ Не синхронізовано'}
        </Text>
  
        <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText} onPress={() => handleDelete(item.id)}>
            🗑️ {t('delete') || 'ВИДАЛИТИ'}
          </Text>
        </View>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Локальні правопорушення</Text>
      <FlatList
        data={violations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 10,
    },
    header: {
      fontSize: 22,
      color: theme.text,
      textAlign: 'center',
      marginBottom: 10,
    },
    list: {
      paddingBottom: 20,
    },
    item: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 6,
    },
    textContainer: {
      marginTop: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#0033A0',
    },
    description: {
      fontSize: 16,
      color: '#333',
      marginVertical: 5,
    },
    meta: {
      fontSize: 14,
      color: '#666',
    },
    deleteButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#ff4d4d',
      alignItems: 'center',
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },    
  });
