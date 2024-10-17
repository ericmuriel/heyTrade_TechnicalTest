import React from 'react';
import { Modal, ScrollView, Button, ColorValue } from 'react-native';
import {
  ModalContainer,
  ModalContent,
  ButtonContainer,
  Text as StyledText
} from './ModalFilmDetailStyled';

interface FilmDetailModalProps {
    visible: boolean;
    onClose: () => void;
    film: {
      title: string;
      overview: string;
    };
    theme: {
      styles: {
        button: {
          backgroundColor?: ColorValue | undefined;
        };
      };
    };
  }

  const FilmDetailModal: React.FC<FilmDetailModalProps> = ({ visible, onClose, film, theme }) => {
    const buttonBackgroundColor = theme.styles.button.backgroundColor || '#6200ea';

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <ModalContainer>
          <ModalContent>
            <StyledText
              testID="title-text"
              style={{ fontSize: 24, fontWeight: 'bold' }}
            >
              {film.title}
            </StyledText>
            <ScrollView>
              <StyledText
                testID="overview-text"
                style={{ fontSize: 16 }}
              >
                {film.overview}
              </StyledText>
            </ScrollView>
            <ButtonContainer>
              <Button
                testID="close-button"
                title="Close"
                color={buttonBackgroundColor}
                onPress={onClose}
              />
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      </Modal>
    );
};

export default FilmDetailModal;
