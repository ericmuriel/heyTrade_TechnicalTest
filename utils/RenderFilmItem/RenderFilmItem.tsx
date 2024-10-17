// utils/FilmItemRenderer.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FilmCard, FilmImage, FilmTitle } from './RenderFilmItemStyled';

interface FilmItemProps {
  item: any;
  navigation: any;
}

export const FilmItemRenderer: React.FC<FilmItemProps> = ({ item, navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Details', { film: item })}
    testID={`film-item-${item.id}`}
  >
    <FilmCard>
      <FilmImage source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
      <FilmTitle>{item.title}</FilmTitle>
    </FilmCard>
  </TouchableOpacity>
);