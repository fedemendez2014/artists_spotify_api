import express, { NextFunction, Request, Response } from 'express';
import albums from './routes/albums';

/**
 * Inicializo express
 */
const app = express();

/**
 * CORS middleware
 */
app.use((req, resp, next) => {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  resp.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  resp.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/**
 * Rutas
 */
app.use('/albums', albums);

/**
 * 
 */
app.listen(8000, () => {
  console.log(`Server is running`);
});