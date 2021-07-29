# artists_spotify_api

- Primero en src/constants.ts se debe configurar los datos de conexión a la base de datos

- SQL necesario para crear la base:
    Create database integration_spotify;
    CREATE TABLE `logs` (
        `id` int(11) NOT NULL,
        `ip` varchar(50) NOT NULL,
        `date` date NOT NULL,
        `url` varchar(50) NOT NULL,
        `createdAt` timestamp NULL DEFAULT NULL,
        `updatedAt` timestamp NULL DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
- Para iniciar el proyecto ejecutar los comandos "npm i" y luego "npm start"
