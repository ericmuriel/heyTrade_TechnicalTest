import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilmDetailModal from './ModalFilmDetail';

describe('FilmDetailModal Component', () => {
    const mockFilm = {
        title: 'Test Movie',
        overview: 'This is a test overview for the movie.'
    };

    const mockTheme = {
        styles: {
            button: {
                backgroundColor: '#6200ea',
            },
        },
    };

    const mockOnClose = jest.fn();

    const renderComponent = (visible: boolean) => {
        return render(
            <FilmDetailModal
                visible={visible}
                onClose={mockOnClose}
                film={mockFilm}
                theme={mockTheme}
            />
        );
    };

    it('should render correctly when visible', () => {
        const { getByText, getByTestId } = renderComponent(true);

        // Verifica el título
        expect(getByText(mockFilm.title)).toBeTruthy(); 
        // Verifica la descripción
        expect(getByText(mockFilm.overview)).toBeTruthy(); 
        expect(getByTestId('close-button')).toBeTruthy();
    });

    it('should not render when not visible', () => {
        const { queryByTestId } = renderComponent(false);

        expect(queryByTestId('title-text')).toBeNull();
        expect(queryByTestId('overview-text')).toBeNull();
        expect(queryByTestId('close-button')).toBeNull();
    });

    it('should call onClose when close button is pressed', () => {
        const { getByTestId } = renderComponent(true);

        fireEvent.press(getByTestId('close-button'));
        expect(mockOnClose).toHaveBeenCalled(); 
    });
});