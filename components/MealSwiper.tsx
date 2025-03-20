import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Animated, PanResponder, Text, TouchableOpacity } from 'react-native';
import MealCard from './MealCard';
import { Meal } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface MealSwiperProps {
  meals: Meal[];
  onSwipeRight: (meal: Meal) => void;
  onEmpty: () => void;
}

const SWIPE_THRESHOLD = 120;

export default function MealSwiper({ meals, onSwipeRight, onEmpty }: MealSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (currentIndex >= meals.length) {
      onEmpty();
    }
  }, [currentIndex, meals, onEmpty]);

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: false,
    }).start();
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -500, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: 500, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onSwipeRight(meals[currentIndex]);
      setCurrentIndex(currentIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const cardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate: rotation },
    ],
  };

  if (currentIndex >= meals.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No more meals to show!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentIndex < meals.length && (
        <Animated.View
          style={[styles.cardContainer, cardStyle]}
          {...panResponder.panHandlers}
        >
          <MealCard meal={meals[currentIndex]} />
        </Animated.View>
      )}
      
      {/* Show the next card underneath */}
      {currentIndex + 1 < meals.length && (
        <View style={[styles.cardContainer, styles.nextCard]}>
          <MealCard meal={meals[currentIndex + 1]} />
        </View>
      )}

      {/* Action buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={swipeLeft}>
          <Ionicons name="close-circle" size={60} color="#FF4C4C" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={swipeRight}>
          <Ionicons name="heart-circle" size={60} color="#4CCC93" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    position: 'absolute',
    top: 30,
  },
  nextCard: {
    top: 35,
    zIndex: -1,
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    padding: 10,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
  },
}); 