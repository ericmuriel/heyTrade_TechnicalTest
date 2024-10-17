import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { registerRootComponent } from 'expo';
import { View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import FilmList from './components/FilmList/FilmList';
import FilmDetail from './components/FilmDetail/FilmDetail';
import Wishlist from './components/WishList/WishList';
import { ThemeProvider } from './constants/ThemeContext';
import GenericContextProvider, { GenericContext } from './context/GenericContext';
import { fetchMovies } from './services/fetchService';
import MovieTheme from './components/MovieThemes/MovieThemes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FilmList" 
        component={FilmList} 
        options={{ title: 'Peliculas Populares' }} 
      />
      <Stack.Screen name="Details" component={FilmDetail} />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <GenericContextProvider>
      <Main />
    </GenericContextProvider>
  );
};

const Main: React.FC = () => {
  const { setData, setIsLoading, loading, setTotalPages, currentPage, setCurrentPage, setError } = useContext(GenericContext);

  const loadMovies = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const { movies, totalPages } = await fetchMovies(page);
      setData(movies);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Error al cargar películas. Por favor, intenta de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(currentPage); 
  }, [currentPage]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Popular"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'star';
              if (route.name === "WishlistTab") {
                iconName = 'heart';
              }
              if (route.name === "Categories") {
                iconName = 'menu';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Popular" 
            component={HomeStack} 
            options={{ headerShown: false }} 
          />
          <Tab.Screen 
            name="Categories" 
            component={MovieTheme} 
            options={{ title: 'Categorías' }} 
          />
           <Tab.Screen 
            name="WishlistTab" 
            component={Wishlist} 
            options={{ title: 'Favoritos' }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

registerRootComponent(App);
