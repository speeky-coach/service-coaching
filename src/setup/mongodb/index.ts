import { MongodbApp } from '@speeky/framework';

export const mongodbApp = new MongodbApp(process.env.MONGODB_URL!, process.env.MONGODB_DBNAME!);
