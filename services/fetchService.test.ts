// Importa las funciones necesarias
import { fetchMovies } from '../services/fetchService'; // Asegúrate de que esta ruta sea correcta
import fetchMock from 'jest-fetch-mock';

// Habilita los mocks antes de cada test
beforeAll(() => {
  fetchMock.enableMocks();
});

// Restablece el mock después de cada test
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('fetchMovies', () => {
  it('realiza una llamada exitosa a la API y devuelve datos de películas', async () => {
    // Simula una respuesta exitosa
    fetchMock.mockResponseOnce(JSON.stringify({
      results: [{ id: 1, title: 'Película de prueba' }],
      total_pages: 1,
    }));

    const result = await fetchMovies(1);

    // Verifica que la llamada fue hecha con la URL correcta
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1',
      expect.anything() // para ignorar los headers
    );

    // Verifica los datos retornados
    expect(result.movies).toEqual([{ id: 1, title: 'Película de prueba' }]);
    expect(result.totalPages).toBe(1);
  });

});
