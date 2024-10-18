
Movie App

Es una aplicación de React Native que permite a los usuarios buscar, ver detalles y gestionar una lista de deseos de películas. La aplicación también cuenta con funciones de paginación y filtrado de películas a través de una API externa.

Asegúrate de tener instalados los siguientes programas antes de iniciar:

Node.js (versión 14.x o superior)
npm o yarn (gestor de paquetes)
Expo CLI (si planeas ejecutar la app con Expo)
Si planeas ejecutar el proyecto en un dispositivo físico o emulador:

Android Studio (para emuladores Android)
Xcode (para emuladores iOS, solo en macOS)

Instalación de Node.js y npm
Puedes descargar Node.js y npm desde su sitio oficial. npm viene preinstalado con Node.js.

Para instalar Expo CLI globalmente, ejecuta el siguiente comando:

bash
Copiar código
npm install -g expo-cli
Instalación
Sigue los siguientes pasos para instalar el proyecto en tu máquina local:

Clona este repositorio:
git clone https://github.com/tu-usuario/movie-app.git

Instala las dependencias del proyecto usando npm o yarn:
npm install
# o
yarn install

Configuración
Si el proyecto utiliza variables de entorno (como claves de API para servicios de búsqueda de películas), asegúrate de crear un archivo .env en la raíz del proyecto y agregar las siguientes variables:

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGM5NmM1Y2M5Zjg3OGY3ZGFhMThkYzFjODNkYWRkZiIsIm5iZiI6MTcyMzA1Mjc5OS43NTQ5MDksInN1YiI6IjY2YjNiMTkyYzQxNGFmMGE3ZGE4N2I0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YtpBjW9NxZL80M3SeXgzUmQMh2IxW4-vg9SkYIqowFg';
const API_URL = 'https://api.themoviedb.org/3';

Ejecución
1. Expo
Para iniciar el proyecto usando Expo (opción recomendada si prefieres no lidiar con configuraciones nativas):

npm start
# o
yarn start
Esto abrirá una ventana de Expo en tu navegador. Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil (disponible en la App Store o Google Play) para ver la app en tu teléfono.

2. Emulador o Dispositivo Físico
Si prefieres ejecutar el proyecto en un emulador o dispositivo físico (iOS o Android):

Para iOS (solo en macOS):

npm run ios
# o
yarn ios

Para Android:
npm run android
# o
yarn android


Explicación de carpetas principales:
components/: Contiene todos los componentes  como FilmDetail, Pagination, etc.
context/: Administra los estados globales de la aplicación, usando React Context API.
services/: Maneja todas las llamadas a servicios externos, como la búsqueda de películas.
Scripts Disponibles

En este proyecto puedes ejecutar los siguientes comandos:
npm start / yarn start: Inicia el proyecto con Expo.
npm run ios / yarn ios: Ejecuta el proyecto en un emulador o dispositivo iOS.
npm run android / yarn android: Ejecuta el proyecto en un emulador o dispositivo Android.
npm run test / yarn test: Ejecuta las pruebas unitarias con Jest.
Testing

Para correr las pruebas unitarias del proyecto:
npm run test
# o
yarn test

Las pruebas que hay disponibles se encuentran ubicadas junto a sus respectivos componentes en archivos con la extensión .test.tsx. Esto facilita la localización y ejecución de pruebas específicas.