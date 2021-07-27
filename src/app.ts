import express, { NextFunction, Request, Response } from 'express';
import albums from './routes/albums';

/**
 * Inicializo express
 */
const app = express();

/**
 * Middleware para manejo de excepciones
 */
app.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
  resp.status(500).json({ mesage: err.message });
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