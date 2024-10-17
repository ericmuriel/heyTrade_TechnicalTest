import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  border-top-width: 1px;
  border-top-color: #ccc;
`;

export const PageButton = styled.TouchableOpacity`
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
`;

export const PageButtonText = styled.Text`
  color: #333;
`;
