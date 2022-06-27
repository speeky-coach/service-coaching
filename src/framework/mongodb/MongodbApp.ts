import { MongoClient, Db } from 'mongodb';
import debug from 'debug';

const logger = debug('server:MongodbApp');

class MongodbApp {
  private client: MongoClient;
  private dbName: string;
  private db: Db | null;

  constructor(url: string, dbName: string) {
    this.client = new MongoClient(url);
    this.dbName = dbName;
    this.db = null;
  }

  public async connect(): Promise<void> {
    await this.client.connect();

    this.db = this.client.db(this.dbName);

    logger('Connected');
  }

  public getDb(): Db {
    return this.db!;
  }
}

export const mongodbApp = new MongodbApp(process.env.MONGODB_URL!, process.env.MONGODB_DBNAME!);

export default MongodbApp;
