// services/fetchService.ts
import { Movie, MovieResponse } from '@/context/type';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGM5NmM1Y2M5Zjg3OGY3ZGFhMThkYzFjODNkYWRkZiIsIm5iZiI6MTcyMzA1Mjc5OS43NTQ5MDksInN1YiI6IjY2YjNiMTkyYzQxNGFmMGE3ZGE4N2I0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YtpBjW9NxZL80M3SeXgzUmQMh2IxW4-vg9SkYIqowFg';
const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

export const fetchMovies = async (page: number): Promise<{ movies: Movie[]; totalPages: number }> => {
  const urlWithPage = `${API_URL}&page=${page}`;
  try {
    const response = await fetch(urlWithPage, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: MovieResponse = await response.json();
    return {
      movies: data.results,
      totalPages: data.total_pages,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { movies: [], totalPages: 0 };
  }
};