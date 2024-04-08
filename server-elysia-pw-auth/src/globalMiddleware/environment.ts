import { config } from 'dotenv';

let dotenvPath = '.env.local';
if (process.env.NODE_ENV === 'test') {
  dotenvPath = '.env.test';
} else if (process.env.NODE_ENV === 'production') {
  dotenvPath = '.env';
}

const { parsed, error } = config({ path: dotenvPath });

if (error || !parsed) {
  throw new Error('Error parsing dotenv file');
}

const { NODE_ENV = 'development', PG_URL = '', PORT = '5111' } = parsed;

const env = { NODE_ENV, PG_URL, PORT: parseInt(PORT) };

export default env;
