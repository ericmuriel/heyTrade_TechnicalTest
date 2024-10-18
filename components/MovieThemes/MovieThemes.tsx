import React, { useContext } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import { SectionContainer } from './MovieThemeStyled';
import { GenericContext } from '../../context/GenericContext';
import { useTheme } from '../../constants/ThemeContext';
import { FilmItemRenderer } from '@/utils/RenderFilmItem/RenderFilmItem';

const MovieTheme: React.FC<any> = ({ navigation }) => {
  const { data } = useContext(GenericContext);
  const theme = useTheme();

  const genreIds: Record<string, number[]> = {
    Crimen: [80],
    Comedia: [35],
    Drama: [18],
  };

  const sections = Object.keys(genreIds).map(genre => ({
    title: genre,
    films: data.filter((item: any) => {
      return genreIds[genre].some((id: number) => item.genre_ids.includes(id));
    }),
  }));


  const renderFilmItem = ({ item }: { item: any }) => (
    <FilmItemRenderer item={item} navigation={navigation} />
  );

  return (
    <ScrollView style={theme.styles.container}>
      {sections.map((section, index) => (
        <SectionContainer key={index} testID={`section-${section.title}`}>
          <Text style={theme.styles.title}>{section.title}</Text>
          <FlatList
            data={section.films}
            renderItem={renderFilmItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </SectionContainer>
      ))}
    </ScrollView>
  );
};

export default MovieTheme;
