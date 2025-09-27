# Frontend - Laboratorio de Análisis Biológicos# Getting Started with Create React App



Frontend desarrollado en React con TypeScript para probar y gestionar los endpoints de la base de datos del Laboratorio de Análisis Biológicos.This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## 📋 Descripción## Available Scripts



Esta aplicación permite interactuar con la API del laboratorio para realizar operaciones CRUD sobre:In the project directory, you can run:

- Pacientes

- Análisis clínicos### `npm start`

- Resultados de laboratorio

- Médicos y especialistasRuns the app in the development mode.\

- Historial de estudiosOpen [http://localhost:3000](http://localhost:3000) to view it in the browser.



## 🚀 Instalación y ConfiguraciónThe page will reload if you make edits.\

You will also see any lint errors in the console.

### Prerequisitos

### `npm test`

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)Launches the test runner in the interactive watch mode.\

- [npm](https://www.npmjs.com/) (viene incluido con Node.js)See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.



### Instalación### `npm run build`



1. **Clonar el repositorio:**Builds the app for production to the `build` folder.\

   ```bashIt correctly bundles React in production mode and optimizes the build for the best performance.

   git clone https://github.com/ignaciomg3/front-back.git

   cd front-backThe build is minified and the filenames include the hashes.\

   ```Your app is ready to be deployed!



2. **Instalar dependencias:**See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

   ```bash

   npm install### `npm run eject`

   ```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

3. **Configurar variables de entorno:**

   Crear un archivo `.env` en la raíz del proyecto:If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

   ```env

   REACT_APP_API_URL=http://localhost:5000/apiInstead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

   REACT_APP_ENV=development

   ```You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



## 🏃‍♂️ Comandos Disponibles## Learn More



### DesarrolloYou can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).



```bashTo learn React, check out the [React documentation](https://reactjs.org/).

# Iniciar el servidor de desarrollo
npm start
```
La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

### Testing

```bash
# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas con coverage
npm run test:coverage
```

### Producción

```bash
# Construir para producción
npm run build

# Previsualizar build de producción (requiere serve)
npm install -g serve
serve -s build
```

## 🛠️ Tecnologías Utilizadas

- **React 18** - Librería principal
- **TypeScript** - Tipado estático
- **React Router** - Navegación
- **Axios** - Cliente HTTP para API
- **Material-UI / Ant Design** - Componentes UI
- **React Hook Form** - Gestión de formularios
- **React Query** - Estado del servidor

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
├── pages/             # Páginas principales
├── services/          # Servicios API
├── types/             # Definiciones TypeScript
├── utils/             # Utilidades
├── hooks/             # Custom hooks
├── context/           # Context providers
└── styles/            # Estilos globales
```

## 🔗 Endpoints de la API

La aplicación consume los siguientes endpoints:

### Pacientes
- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Crear paciente
- `PUT /api/patients/:id` - Actualizar paciente
- `DELETE /api/patients/:id` - Eliminar paciente

### Análisis
- `GET /api/analyses` - Listar análisis
- `POST /api/analyses` - Crear análisis
- `GET /api/analyses/:id/results` - Obtener resultados

### Reportes
- `GET /api/reports` - Generar reportes
- `GET /api/reports/:id/pdf` - Descargar PDF

## 🧪 Testing

El proyecto incluye:
- Tests unitarios con Jest
- Tests de componentes con React Testing Library
- Tests de integración para servicios API

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos
npm test -- --testNamePattern="Component"
```

## 🚦 Estado del Proyecto

- ✅ Configuración inicial
- 🔄 Desarrollo en progreso
- ⏳ Testing pendiente
- ⏳ Documentación de API

## 👥 Contribución

1. Fork el proyecto
2. Crear una rama para la feature (`git checkout -b feature/NuevaFeature`)
3. Commit los cambios (`git commit -m 'Agregar nueva feature'`)
4. Push a la rama (`git push origin feature/NuevaFeature`)
5. Abrir un Pull Request

## 📝 Notas de Desarrollo

- Asegúrate de que el backend esté ejecutándose en el puerto configurado
- Usar TypeScript para todas las nuevas implementaciones
- Seguir las convenciones de naming establecidas
- Documentar nuevos componentes y servicios

## 🐛 Troubleshooting

### Problemas comunes:

1. **Error de CORS:**
   - Verificar configuración del backend
   - Revisar URL de la API en `.env`

2. **Dependencias faltantes:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Puerto ocupado:**
   ```bash
   # Cambiar puerto por defecto
   PORT=3001 npm start
   ```

---

**Desarrollado para el Laboratorio de Análisis Biológicos**