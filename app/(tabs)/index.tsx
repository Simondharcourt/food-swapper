import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MealSwiper from '../../components/MealSwiper';
import { getMeals, addToFavorites, sampleMeals } from '../../services/mealService';
import { Meal } from '../../types';
import { auth } from '../../config/firebase';

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadMeals();
    
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadMeals = async () => {
    setLoading(true);
    try {
      // In a real app, this would get meals from Firebase
      // const fetchedMeals = await getMeals();
      
      // For demo purposes, we'll use sample meals with generated IDs
      const fetchedMeals = sampleMeals.map((meal, index) => ({
        ...meal,
        id: `meal-${index}`,
      }));
      
      setMeals(fetchedMeals);
    } catch (error) {
      console.error('Error loading meals:', error);
      Alert.alert('Error', 'Failed to load meals. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwipeRight = async (meal: Meal) => {
    try {
      // If user is logged in, save to favorites
      if (userId) {
        await addToFavorites(userId, meal.id);
      }
      
      // Show confirmation toast or notification
      console.log('Meal added to favorites:', meal.name);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleEmpty = () => {
    // Could show a message or reload more meals
    console.log('No more meals to show');
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CCC93" />
        <Text style={styles.loadingText}>Loading meals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Food Swiper</Text>
        <Text style={styles.subtitle}>Find your perfect meal</Text>
      </View>

      {meals.length > 0 ? (
        <MealSwiper 
          meals={meals} 
          onSwipeRight={handleSwipeRight} 
          onEmpty={handleEmpty}
        />
      ) : (
        <View style={styles.centered}>
          <Ionicons name="restaurant-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No meals available</Text>
          <Text style={styles.emptySubText}>Pull down to refresh</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  emptySubText: {
    marginTop: 10,
    fontSize: 16,
    color: '#aaa',
  },
});
