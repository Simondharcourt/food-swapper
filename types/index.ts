export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  calories: number;
  preparationTime: number;
  ingredients: string[];
  tags: string[];
} 