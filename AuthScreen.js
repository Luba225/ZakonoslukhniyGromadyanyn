import React, { useState, useContext } from 'react';
import {View,Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform,} from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';

const AuthScreen = ({ onLogin }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !password) return alert(t('fill_all_fields'));
    if (!email.includes('@')) return alert(t('invalid_email'));

    console.log(isLogin ? '🔐 Login:' : '🆕 Register:', email);
    onLogin();
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <ImageBackground
      source={require('../assets/vyshyvanka_bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            {isLogin ? t('login') : t('register')}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#eee"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder={t('password')}
            placeholderTextColor="#eee"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isLogin ? t('login') : t('register')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleMode}>
            <Text style={styles.toggle}>
              {isLogin ? t('no_account') : t('have_account')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005BBB',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#005BBB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  toggle: {
    marginTop: 15,
    textAlign: 'center',
    color: '#005BBB',
  },
});
