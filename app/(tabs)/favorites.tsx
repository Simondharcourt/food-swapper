import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFavoriteMeals, sampleMeals } from '../../services/mealService';
import { Meal } from '../../types';
import { auth } from '../../config/firebase';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
        loadFavorites(user.uid);
      } else {
        setUserId(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadFavorites = async (uid: string) => {
    setLoading(true);
    try {
      // In a real app, this would get favorite meals from Firebase
      // const favoriteMeals = await getFavoriteMeals(uid);
      
      // For demo purposes, we'll just use the first 2 sample meals
      const favoriteMeals = sampleMeals.slice(0, 2).map((meal, index) => ({
        ...meal,
        id: `favorite-${index}`,
      }));
      
      setFavorites(favoriteMeals);
    } catch (error) {
      console.error('Error loading favorites:', error);
      Alert.alert('Error', 'Failed to load favorite meals. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderMealItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity style={styles.mealCard}>
      <Image source={{ uri: item.image }} style={styles.mealImage} />
      <View style={styles.mealInfo}>
        <Text style={styles.mealName}>{item.name}</Text>
        <Text style={styles.mealDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.mealDetails}>
          <Text style={styles.mealDetail}>⏱️ {item.preparationTime} min</Text>
          <Text style={styles.mealDetail}>🔥 {item.calories} cal</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CCC93" />
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  if (!userId) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Favorites</Text>
        </View>
        <View style={styles.centered}>
          <Ionicons name="person-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Please sign in</Text>
          <Text style={styles.emptySubText}>
            Sign in to save and view your favorite meals
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderMealItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.centered}>
          <Ionicons name="heart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubText}>
            Swipe right on meals you like to add them here
          </Text>
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
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealImage: {
    width: 100,
    height: 100,
  },
  mealInfo: {
    flex: 1,
    padding: 12,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  mealDetails: {
    flexDirection: 'row',
  },
  mealDetail: {
    fontSize: 12,
    color: '#888',
    marginRight: 12,
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
    textAlign: 'center',
  },
}); 