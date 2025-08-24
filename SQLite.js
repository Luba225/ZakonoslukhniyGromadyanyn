import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, Image, Linking, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
//база даних буде називатись violations.db оскільки вона буде не одна є вже бек під неї
const db = SQLite.openDatabase('violations.db');
export default function App() {
  const [image, setImage] = useState(null);
  const [violations, setViolations] = useState([]);
  const [description, setDescription] = useState('');

  // Таблиця
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS violations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          image TEXT,
          description TEXT
        );`
      );
    });

    loadViolations(); // завантажити збережені дані
  }, []);

  // Функція для збереження правопорушення. Усе українською
  const saveViolation = () => {
    if (!image) {
      Alert.alert("Помилка", "Будь ласка, зробіть фото");
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO violations (image, description) VALUES (?, ?);',
        [image, description],
        (_, result) => {
          console.log("Збережено!", result);
          loadViolations();
          setImage(null);
          setDescription('');
        },
        (_, error) => {
          console.log("Помилка при збереженні", error);
        }
      );
    });
  };

  // Завантаження
  const loadViolations = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM violations;',
        [],
        (_, { rows }) => {
          const data = rows._array;
          console.log("Дані з бази:", data); // виводимо в консоль
          setViolations(data);
        },
        (_, error) => {
          console.log("Помилка при завантаженні", error);
        }
      );
    });
  };

  // Фото
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Доступ до камери', 'Надайте доступ до камери');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Створення правопорушення</Text>

      <Button title="Зробити фото" onPress={handleTakePhoto} />

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <TextInput
        placeholder="Опис правопорушення"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Зберегти правопорушення" onPress={saveViolation} />

      <Text style={styles.subtitle}>Список збережених правопорушень:</Text>

      {/* Тимчасовий візуальний список */}
      <FlatList
        data={violations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.violationItem}>
            <Image source={{ uri: item.image }} style={styles.violationImage} />
            <Text>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Поки що немає даних</Text>}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  violationItem: {
    marginVertical: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  violationImage: {
    width: '100%',
    height: 150,
    marginBottom: 5,
  },
});
