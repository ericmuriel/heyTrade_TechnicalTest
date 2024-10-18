import React from 'react';
import { render } from '@testing-library/react-native';
import { GenericContext } from '../../context/GenericContext';
import MovieTheme from '../MovieThemes/MovieThemes';

const mockMovies = [
    {
        id: 1,
        title: 'Crime Movie 1',
        poster_path: '/path1.jpg',
        adult: false,
        backdrop_path: '/backdrop1.jpg',
        genre_ids: [80],
        original_language: 'en',
        original_title: 'Original Movie 1',
        overview: 'Overview of Movie 1',
        popularity: 100,
        release_date: '2023-01-01',
        vote_average: 8.0,
        vote_count: 150,
        video: false,
    },
    {
        id: 2,
        title: 'Comedy Movie 1',
        poster_path: '/path2.jpg',
        adult: false,
        backdrop_path: '/backdrop2.jpg',
        genre_ids: [35],
        original_language: 'en',
        original_title: 'Original Movie 2',
        overview: 'Overview of Movie 2',
        popularity: 80,
        release_date: '2023-02-01',
        vote_average: 7.5,
        vote_count: 100,
        video: false,
    },
    {
        id: 3,
        title: 'Drama Movie 1',
        poster_path: '/path3.jpg',
        adult: false,
        backdrop_path: '/backdrop3.jpg',
        genre_ids: [18],
        original_language: 'en',
        original_title: 'Original Movie 3',
        overview: 'Overview of Movie 3',
        popularity: 70,
        release_date: '2023-03-01',
        vote_average: 7.0,
        vote_count: 90,
        video: false,
    },
];

const mockContext = {
    data: mockMovies,
    setData: jest.fn(),
    setFilteredData: jest.fn(),
    loading: false,
    setIsLoading: jest.fn(),
    movies: mockMovies,
    setMovies: jest.fn(),
    wishlist: mockMovies,
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
    error: null,
    totalPages: 1,
    setTotalPages: jest.fn(),
    currentPage: 1,
    setCurrentPage: jest.fn(),
    filteredData: mockMovies,
    setError: jest.fn(),
};

describe('MovieTheme Component', () => {
    const renderComponent = () => {
        return render(
            <GenericContext.Provider value={mockContext}>
                <MovieTheme navigation={{}} />
            </GenericContext.Provider>
        );
    };

    it('should render sections correctly based on genres', () => {
        const { getByText, getByTestId } = renderComponent();

        // Secciones de géneros se renderizan 
        expect(getByTestId('section-Crime')).toBeTruthy();
        expect(getByTestId('section-Comedy')).toBeTruthy();
        expect(getByTestId('section-Drama')).toBeTruthy();

        // Películas de cada sección se renderizan
        expect(getByText('Crime Movie 1')).toBeTruthy();
        expect(getByText('Comedy Movie 1')).toBeTruthy();
        expect(getByText('Drama Movie 1')).toBeTruthy();
    });

    it('should not render films that do not match the genre', () => {
        const { queryByText } = renderComponent();

        // No se renderiza ninguna película de un género que no haya
        expect(queryByText('Some Non-Existent Movie')).toBeFalsy();
    });
});
