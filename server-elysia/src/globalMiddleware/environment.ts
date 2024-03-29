import 'dotenv/config';

const { NODE_ENV = 'development', PG_URL = '', PORT = '5111' } = process.env;

const env = { NODE_ENV, PG_URL, PORT: parseInt(PORT) };

export default env;
