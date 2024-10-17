import React, { useContext, useState } from 'react';
import { View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { GenericContext } from '../../context/GenericContext';
import {
  Header,
  ContentContainer,
  ImageArea,
  DescriptionArea,
  FilmImage,
  AdditionalInfo,
  ReadMore,
  ButtonContainer,
  Text as StyledText
} from './FilmDetailStyled';
import { useTheme } from '@/constants/ThemeContext';
import FilmDetailModal from './ModalFilmDetail/ModalFilmDetail';

const FilmDetail = ({ route }: any) => {
  const { film } = route.params;
  const { wishlist, addToWishlist } = useContext(GenericContext);
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const isFilmInWishlist = wishlist.some(item => item.id === film.id);

  const truncatedText = film.overview.length > 250 ? `${film.overview.substring(0, 250)}...` : film.overview;
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}> 
      <ScrollView contentContainerStyle={theme.styles.container}>
        <Header>
          <StyledText style={{ fontSize: 24, fontWeight: 'bold' }}>
            {film.title}
          </StyledText>
        </Header>

        <ContentContainer>
          <ImageArea>
            <FilmImage source={{ uri: `https://image.tmdb.org/t/p/w500${film.poster_path}` }} />
          </ImageArea>
          <DescriptionArea>
            <StyledText style={{ fontSize: 16 }}>
              {truncatedText}
            </StyledText>

            {film.overview.length > 100 && (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <ReadMore>Leer Más</ReadMore>
              </TouchableOpacity>
            )}
            <ButtonContainer>
              <Button
                title={isFilmInWishlist ? "In Wishlist" : "Add to Wishlist"}
                color={theme.styles.button.backgroundColor}
                onPress={() => {
                  if (!isFilmInWishlist) {
                    addToWishlist(film);
                  }
                }}
                disabled={isFilmInWishlist}
              />
            </ButtonContainer>
          </DescriptionArea>
        </ContentContainer>
        <AdditionalInfo>
          <StyledText>Información Adicional:</StyledText>
          <StyledText>Fecha de salida: {film.release_date}</StyledText>
          <StyledText>Media de votación: {film.vote_average}</StyledText>
          <StyledText>Votos totales: {film.vote_count}</StyledText>
        </AdditionalInfo>

        <FilmDetailModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          film={film}
          theme={theme}
        />
      </ScrollView>
    </View>
  );
};

export default FilmDetail;
