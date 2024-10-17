import React, { createContext, useState } from 'react'
import { initialValue } from './InitialValues';
import { GenericContextValue, Movie } from './type';

export const GenericContext = createContext<GenericContextValue>(initialValue)

export default function GenericContextProvider({ children }: any) {
    const [data, setData] = useState<Movie[]>([]);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [wishlist, setWishlist] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    const addToWishlist = (film: Movie) => {
        setWishlist((prevWishlist) => {
            if (!prevWishlist.some(item => item.id === film.id)) {
                return [...prevWishlist, film];
            }
            return prevWishlist;
        });
    };

    const removeFromWishlist = (movieId: number) => {
        setWishlist(prevWishlist => prevWishlist.filter(movie => movie.id !== movieId));
    };

    const contextValue: GenericContextValue = {
        data,
        setData,
        loading,
        setIsLoading,
        movies,
        setMovies,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        setTotalPages,
        totalPages,
        currentPage, 
        setCurrentPage,
        error,
        setError
    }

    return (
        <GenericContext.Provider value={contextValue}>
            {children}
        </GenericContext.Provider>)
}