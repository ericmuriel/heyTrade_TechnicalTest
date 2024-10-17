import { Dispatch, SetStateAction } from "react";

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  export interface MovieResponse {
    results: Movie[];
    total_pages: number;
  }

  export interface GenericContextValue {
    data: Movie[];
    setData: Dispatch<SetStateAction<Movie[]>>;
    loading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    wishlist: Movie[];
    totalPages: number;
    setTotalPages: (total: number) => void;
    currentPage: number;
    setCurrentPage: (total: number) => void;
    addToWishlist: (film: Movie) => void;
    removeFromWishlist: (id: number) => void;
    error: string | null;
    setError: (error: string | null) => void;
    }
