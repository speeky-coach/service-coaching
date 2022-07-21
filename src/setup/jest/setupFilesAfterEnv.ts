import { mongodbApp, rabbitMQApp } from '../../app/server';

beforeAll(async () => {
  await mongodbApp.connect();
  await rabbitMQApp.connect();
});

afterAll(async () => {});
