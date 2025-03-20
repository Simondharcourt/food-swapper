import { collection, getDocs, addDoc, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Meal } from '../types';

const MEALS_COLLECTION = 'meals';
const FAVORITES_COLLECTION = 'favorites';

// Get all meals from Firestore
export const getMeals = async (): Promise<Meal[]> => {
  try {
    const mealsCollection = collection(db, MEALS_COLLECTION);
    const mealsSnapshot = await getDocs(mealsCollection);
    return mealsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Meal));
  } catch (error) {
    console.error('Error getting meals:', error);
    throw error;
  }
};

// Add a new meal to Firestore
export const addMeal = async (meal: Omit<Meal, 'id'>): Promise<string> => {
  try {
    const mealsCollection = collection(db, MEALS_COLLECTION);
    const docRef = await addDoc(mealsCollection, meal);
    return docRef.id;
  } catch (error) {
    console.error('Error adding meal:', error);
    throw error;
  }
};

// Add a meal to user's favorites
export const addToFavorites = async (userId: string, mealId: string): Promise<void> => {
  try {
    const favoritesCollection = collection(db, FAVORITES_COLLECTION);
    await addDoc(favoritesCollection, {
      userId,
      mealId,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

// Get user's favorite meals
export const getFavoriteMeals = async (userId: string): Promise<Meal[]> => {
  try {
    const favoritesCollection = collection(db, FAVORITES_COLLECTION);
    const favoritesQuery = query(favoritesCollection, where('userId', '==', userId));
    const favoritesSnapshot = await getDocs(favoritesQuery);
    
    const mealIds = favoritesSnapshot.docs.map(doc => doc.data().mealId);
    
    if (mealIds.length === 0) {
      return [];
    }
    
    const meals = await getMeals();
    return meals.filter(meal => mealIds.includes(meal.id));
  } catch (error) {
    console.error('Error getting favorite meals:', error);
    throw error;
  }
};

// Some sample meals data for testing
export const sampleMeals: Omit<Meal, 'id'>[] = [
  {
    name: 'Avocado Toast',
    description: 'Creamy avocado spread on whole grain toast, topped with cherry tomatoes and microgreens.',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=1000',
    calories: 320,
    preparationTime: 10,
    ingredients: ['avocado', 'whole grain bread', 'cherry tomatoes', 'olive oil', 'salt', 'pepper', 'microgreens'],
    tags: ['breakfast', 'vegetarian', 'quick']
  },
  {
    name: 'Chicken Caesar Salad',
    description: 'Fresh romaine lettuce with grilled chicken, croutons, parmesan cheese and creamy Caesar dressing.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1000',
    calories: 450,
    preparationTime: 20,
    ingredients: ['chicken breast', 'romaine lettuce', 'croutons', 'parmesan cheese', 'caesar dressing'],
    tags: ['lunch', 'protein', 'salad']
  },
  {
    name: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta with rich tomato and beef sauce, topped with parmesan cheese.',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1000',
    calories: 650,
    preparationTime: 30,
    ingredients: ['spaghetti', 'ground beef', 'tomatoes', 'onion', 'garlic', 'carrots', 'celery', 'red wine', 'herbs'],
    tags: ['dinner', 'italian', 'pasta']
  },
  {
    name: 'Smoothie Bowl',
    description: 'Thick blended smoothie topped with fresh fruits, granola, and chia seeds.',
    image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=1000',
    calories: 380,
    preparationTime: 15,
    ingredients: ['banana', 'berries', 'yogurt', 'almond milk', 'granola', 'chia seeds', 'honey'],
    tags: ['breakfast', 'vegetarian', 'healthy']
  },
  {
    name: 'Grilled Salmon',
    description: 'Perfectly grilled salmon fillet with lemon and herbs, served with steamed vegetables.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000',
    calories: 420,
    preparationTime: 25,
    ingredients: ['salmon fillet', 'lemon', 'dill', 'olive oil', 'garlic', 'broccoli', 'asparagus'],
    tags: ['dinner', 'seafood', 'protein', 'healthy']
  }
]; 