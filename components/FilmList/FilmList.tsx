import React, { useContext, useState, useEffect } from 'react';
import { FlatList, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GenericContext } from '../../context/GenericContext';
import Pagination from '../Pagination/Pagination';
import { FilmItemRenderer } from '../../utils/RenderFilmItem/RenderFilmItem';
import { Movie } from '../../context/type';
import { searchMovies } from '../../services/SearchMovies';
import styles from './FilmListStyles';
import { Ionicons } from '@expo/vector-icons';

const FilmList: React.FC<any> = ({ navigation }) => {
  const { data, totalPages, setCurrentPage, loading, error } = useContext(GenericContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      // Solo busca si hay al menos un carácter en el input
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        const { movies } = await searchMovies(searchQuery);
        setSearchResults(movies);
      } else {
        // Input está vacío, limpia resultados
        setSearchResults([]);
      }
      setIsSearching(false);
    };

    // Llama a la función fetchSearchResults cada vez que searchQuery cambie
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Clean resultados cuando vas a otra pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearchQuery('');
      setSearchResults([]);
    });

    return unsubscribe;
  }, [navigation]);

  const renderFilmItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity >
      <FilmItemRenderer item={item} navigation={navigation} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar películas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      ) : (
        <>
          <FlatList
            key={'columns_2'}
            data={data} 
            renderItem={renderFilmItem} 
            keyExtractor={(item) => item.id.toString()} 
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={true}  
            numColumns={2}  
          />
          <Pagination
            currentPage={1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {searchResults.length > 0 && (
            <>
              <FlatList
                data={searchResults}
                renderItem={renderFilmItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.dropdown}
                numColumns={2} 
                nestedScrollEnabled={true}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

export default FilmList;
