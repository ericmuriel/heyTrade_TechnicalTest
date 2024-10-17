import React, { useContext, useState } from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { FilmCard, FilmImage, FilmTitle } from './FilmListStyled';
import { GenericContext } from '@/context/GenericContext';
import Pagination from '../Pagination/Pagination';

const FilmList: React.FC<any> = ({ navigation }) => {
  const { data, totalPages, setCurrentPage, loading, error } = useContext(GenericContext);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderFilmItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { film: item })}
      testID={`film-item-${item.id}`}
    >
      <FilmCard>
        <FilmImage source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
        <FilmTitle>
          <Text>{item.title}</Text>
        </FilmTitle>
      </FilmCard>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={{ color: 'red' }}>{error}</Text> {/* Mostrar mensaje de error */}
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
        </>
      )}
    </View>
  );
};

export default FilmList;
