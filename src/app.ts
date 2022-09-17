import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from "morgan";
import routes from "./routes";
import { config } from '../config';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, AUTHORIZATION'
  );
  next();
});

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

routes(app);

if (!config.isTestEnvironment) {
  app.listen(config.port);
  console.info('App is listening on port:', config.port);
}