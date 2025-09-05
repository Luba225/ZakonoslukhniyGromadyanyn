import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import { themes } from '../theme/theme';
import { fetchViolations } from '../services/db';

export default function MapScreen() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(themes[theme]);
  const [violations, setViolations] = useState([]);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const loadViolations = async () => {
      try {
        const fetchedViolations = await fetchViolations();
        setViolations(fetchedViolations);
        if (fetchedViolations.length > 0) {
          setInitialRegion({
            latitude: fetchedViolations[0].latitude,
            longitude: fetchedViolations[0].longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }
      } catch (err) {
        console.log('Error fetching violations:', err);
      }
    };
    loadViolations();
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion ? (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {violations.map((violation) => (
            <Marker
              key={violation.id}
              coordinate={{
                latitude: violation.latitude,
                longitude: violation.longitude,
              }}
              title={violation.title}
              description={violation.description}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>{t('map_loading')}</Text>
        </View>
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    text: {
      color: theme.text,
      fontSize: 20,
    },
