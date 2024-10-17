import React, { useContext, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { GenericContext } from '@/context/GenericContext';
import Pagination from '../Pagination/Pagination';
import { FilmItemRenderer } from '@/utils/RenderFilmItem/RenderFilmItem';

const FilmList: React.FC<any> = ({ navigation }) => {
  const { data, totalPages, setCurrentPage, loading, error } = useContext(GenericContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderFilmItem = ({ item }: { item: any }) => (
    <FilmItemRenderer item={item} navigation={navigation} />
  );
  
  return (
    <View style={{ flex: 1 }}>
        <TextInput
        placeholder="Buscar películas..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />
      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
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
        </>
      )}
    </View>
  );
};

export default FilmList;
