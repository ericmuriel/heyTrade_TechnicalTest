// FilmListStyles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    width:'90%',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dropdown: {
    maxHeight: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 10,
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    top: 50,
    padding: 10,
  },
  dropdownItem: {
    width: '48%',
    margin: '1%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  searchContainer: {
    flexDirection: 'row', // Coloca el input y la cruz en fila
    alignItems: 'center', // Centra verticalmente
    margin: 10,
    width: '100%', // Asegúrate de que el contenedor ocupe el 100% del ancho
  },
  clearButton: {
    marginLeft: 6,
    paddingBottom: 8,
  },
});

export default styles;
