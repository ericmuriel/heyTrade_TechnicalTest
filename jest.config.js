module.exports = {
    preset: 'jest-expo', // Asegura que Jest use la configuración para Expo
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Usa babel-jest para transformar los archivos
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@expo|expo|@testing-library))',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'], // Extiende las funcionalidades de testing-library
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1', // Mapea las rutas absolutas si las estás usando
    },
  };
  