import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Meal } from '../types';

const newRecipes: Omit<Meal, 'id'>[] = [
  {
    name: 'Poke Bowl au Saumon',
    description: 'Un bol hawaïen frais avec du saumon cru mariné, du riz, des légumes croquants et une sauce soja-sésame.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000',
    calories: 550,
    preparationTime: 25,
    ingredients: ['saumon frais', 'riz sushi', 'avocat', 'concombre', 'edamame', 'carotte', 'sauce soja', 'huile de sésame', 'graines de sésame'],
    tags: ['healthy', 'poisson', 'japonais', 'bowl']
  },
  {
    name: 'Buddha Bowl Végétarien',
    description: 'Un bol coloré et nutritif avec du quinoa, des légumes rôtis, des pois chiches épicés et une sauce tahini.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000',
    calories: 480,
    preparationTime: 35,
    ingredients: ['quinoa', 'pois chiches', 'patate douce', 'chou kale', 'avocat', 'hummus', 'tahini', 'citron', 'épices'],
    tags: ['vegetarien', 'healthy', 'bowl', 'sans gluten']
  },
  {
    name: 'Pad Thai aux Crevettes',
    description: 'Des nouilles de riz sautées avec des crevettes, des légumes croquants et une sauce traditionnelle thaï.',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1000',
    calories: 580,
    preparationTime: 30,
    ingredients: ['nouilles de riz', 'crevettes', 'tofu', 'germes de soja', 'cacahuètes', 'sauce poisson', 'tamarin', 'œuf', 'ciboule'],
    tags: ['asiatique', 'fruits de mer', 'thai', 'nouilles']
  },
  {
    name: 'Curry de Lentilles',
    description: 'Un curry végétarien réconfortant avec des lentilles corail, des épices indiennes et du lait de coco.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000',
    calories: 420,
    preparationTime: 40,
    ingredients: ['lentilles corail', 'oignon', 'tomates', 'lait de coco', 'épinards', 'curry', 'cumin', 'gingembre', 'ail'],
    tags: ['vegetarien', 'indien', 'curry', 'comfort food']
  },
  {
    name: 'Burrito Bowl Mexicain',
    description: 'Un bol mexicain avec du riz, des haricots noirs, du poulet grillé et du guacamole maison.',
    image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?q=80&w=1000',
    calories: 650,
    preparationTime: 35,
    ingredients: ['riz brun', 'poulet', 'haricots noirs', 'maïs', 'avocat', 'tomates', 'coriandre', 'citron vert', 'épices mexicaines'],
    tags: ['mexicain', 'bowl', 'protein', 'épicé']
  },
  {
    name: 'Salade Niçoise',
    description: 'Une salade française classique avec du thon, des œufs, des haricots verts et des olives.',
    image: 'https://images.unsplash.com/photo-1511357840105-748c95f0a7e7?q=80&w=1000',
    calories: 450,
    preparationTime: 25,
    ingredients: ['thon', 'œufs', 'haricots verts', 'pommes de terre', 'olives niçoises', 'tomates cerises', 'anchois', 'vinaigrette', 'salade'],
    tags: ['francais', 'salade', 'poisson', 'healthy']
  },
  {
    name: 'Ramen Végétarien',
    description: 'Un bol de ramen réconfortant avec un bouillon végétal, des champignons et un œuf mollet.',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=1000',
    calories: 480,
    preparationTime: 45,
    ingredients: ['nouilles ramen', 'champignons shiitake', 'œuf', 'épinards', 'maïs', 'algues nori', 'oignon vert', 'sauce soja', 'miso'],
    tags: ['japonais', 'vegetarien', 'soupe', 'comfort food']
  },
  {
    name: 'Falafels et Houmous',
    description: 'Des falafels croustillants servis avec du houmous maison, des légumes frais et du pain pita.',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?q=80&w=1000',
    calories: 520,
    preparationTime: 40,
    ingredients: ['pois chiches', 'persil', 'coriandre', 'oignon', 'ail', 'cumin', 'pain pita', 'tahini', 'citron'],
    tags: ['vegetarien', 'moyen-oriental', 'healthy', 'street food']
  }
];

async function addRecipes() {
  const mealsCollection = collection(db, 'meals');
  
  for (const recipe of newRecipes) {
    try {
      const docRef = await addDoc(mealsCollection, recipe);
      console.log('Recette ajoutée avec succès, ID:', docRef.id);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette:', recipe.name, error);
    }
  }
}

// Exécuter la fonction
addRecipes().then(() => {
  console.log('Toutes les recettes ont été ajoutées !');
}).catch((error) => {
  console.error('Erreur lors de l\'ajout des recettes:', error);
}); 