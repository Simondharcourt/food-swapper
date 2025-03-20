import 'expo-dev-client';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';

// Import Firebase
import { app } from './config/firebase';

// Import app component
import { Slot } from 'expo-router';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    // Initialize Firebase and other services
    if (app) {
      console.log('Firebase initialized successfully');
    }
    
    // Simulate loading
    setTimeout(() => {
      setInitializing(false);
    }, 2000);
  }, []);

  // Check if fonts are loaded
  if (!fontsLoaded && !initializing) {
    return null;
  }

  // Loading screen
  if (initializing) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Food Swiper</Text>
        <Text style={styles.tagline}>Find your perfect meal</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Slot />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CCC93',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
  },
}); 