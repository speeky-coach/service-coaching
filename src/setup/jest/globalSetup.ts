import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env.test.local',
});

import { createRabbitmqQueueTest, rabbitmqHttpApi } from '@speeky/framework';

/**
 * This function is executed only one time before of all the tests.
 */
export default async () => {
  await createRabbitmqQueueTest();
  await rabbitmqHttpApi.purgeQueue();
};
