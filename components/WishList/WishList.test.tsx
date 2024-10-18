import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GenericContext } from '../../context/GenericContext';
import WishlistScreen from './WishList';

const mockMovies = [
    {
        id: 1,
        title: 'Movie 1',
        poster_path: '/path1.jpg',
        adult: false,
        backdrop_path: '/backdrop1.jpg',
        genre_ids: [28],
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
        title: 'Movie 2',
        poster_path: '/path2.jpg',
        adult: false,
        backdrop_path: '/backdrop2.jpg',
        genre_ids: [12],
        original_language: 'en',
        original_title: 'Original Movie 2',
        overview: 'Overview of Movie 2',
        popularity: 80,
        release_date: '2023-02-01',
        vote_average: 7.5,
        vote_count: 100,
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

describe('WishlistScreen', () => {
    it('should render the list of favorite movies', () => {
        const { getByText } = render(
            <GenericContext.Provider value={mockContext}>
                <WishlistScreen />
            </GenericContext.Provider>
        );

        // Verifica que las películas se muestran
        expect(getByText('Movie 1')).toBeTruthy();
        expect(getByText('Movie 2')).toBeTruthy();
    });

    it('should show a message when the wishlist is empty', () => {
        const emptyContext = {
            data: [],
            setData: jest.fn(),
            loading: false,
            setIsLoading: jest.fn(),
            movies: [],
            setMovies: jest.fn(),
            wishlist: [], // La wishlist está vacía
            addToWishlist: jest.fn(),
            removeFromWishlist: jest.fn(),
            error: null,
            totalPages: 1,
            setTotalPages: jest.fn(),
            currentPage: 1,
            setCurrentPage: jest.fn(),
            filteredData: [],
            setFilteredData: jest.fn(),
            setError: jest.fn(),
        };

        const { getByText } = render(
            <GenericContext.Provider value={emptyContext}>
                <WishlistScreen />
            </GenericContext.Provider>
        );

        expect(getByText('Tu lista de favoritos está vacía.')).toBeTruthy();
    });

    it('should call removeFromWishlist when the close button is pressed', () => {
        const contextWithMovie = {
            ...mockContext,
            wishlist: [mockMovies[0]], // Solo incluyo una peli para este test
        };

        const { getByTestId } = render(
            <GenericContext.Provider value={contextWithMovie}>
                <WishlistScreen />
            </GenericContext.Provider>
        );

        const closeButton = getByTestId('close-button');
        fireEvent.press(closeButton);

        expect(contextWithMovie.removeFromWishlist).toHaveBeenCalledWith(1); // Verifica que se llame a la función con el ID correcto
    });
});
