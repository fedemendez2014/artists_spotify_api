import express, { NextFunction, Request, Response } from 'express';
import albums from './routes/Albums';
import { saveLog } from './services/log';

/**
 * Inicializo express
 */
const app = express();

/**
 * Middleware for CORS
 */
app.use((req: Request, resp: Response, next: NextFunction) => {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  resp.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  resp.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/**
 * Middleware para loguear las peticiones que llegan
 */
app.use(async (req: Request, resp: Response, next: NextFunction) => {
  try {
    saveLog(req.ip, req.url);
  } catch (error) {
    throw error;
  }
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