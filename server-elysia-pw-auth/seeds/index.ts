import { pgClient } from '../src/globalMiddleware/db';
import { initial_data } from './0000_initial_data';

export const runSeeds = async () => {
  await initial_data();
};

if (import.meta.main) {
  await runSeeds();
  await pgClient.end();
}
