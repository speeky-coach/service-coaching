import Express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import NotFoundError from './errors/NotFoundError';
import healthRouter from './healthRouter';

import pkg from '../../../package.json';

const logger = debug('server:ExpressApp');

class ExpressApp {
  public app: Application;

  constructor(routers: Express.Router[]) {
    this.app = Express();

    this.loadMiddleware();

    this.loadRouters(routers);

    // this.loadNotFoundError();

    this.loadHandleError();
  }

  private loadMiddleware(): void {
    this.app.use(cors());

    this.app.use(helmet());

    this.app.use(bodyParser.json());

    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'test.local') {
      this.app.use(morgan('combined'));
    }

    this.app.use((req, res, next) => {
      res.set('X-service-version', pkg.version);

      next();
    });
  }

  private loadRouters(routers: Express.Router[]): void {
    routers.forEach((router) => {
      this.app.use(router);
    });

    this.app.use(healthRouter);
  }

  private loadNotFoundError(): void {
    this.app.all('*', (req, res, next) => {
      next(new NotFoundError());
    });
  }

  private loadHandleError(): void {
    this.app.use(errorHandler);
  }

  public listen(): void {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'test.local') {
      this.app.listen(process.env.PORT, () => {
        logger(`Connected [port ${process.env.PORT}]`);
      });
    }
  }

  public async runServices(services: Promise<any>[]): Promise<void> {
    await Promise.all(services);
  }

  public async start(services: Promise<any>[]): Promise<void> {
    await this.runServices(services);

    this.listen();
  }
}

export default ExpressApp;
