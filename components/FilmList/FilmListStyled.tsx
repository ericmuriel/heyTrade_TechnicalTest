import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const SectionContainer = styled.View`
  margin-bottom: 20px;
`;

export const FilmCard = styled.View`
  margin-right: 20px;
  width: ${width * 0.45}px;
`;

export const FilmImage = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 10px;
`;

export const FilmTitle = styled.Text`
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
`;
