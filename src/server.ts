/* eslint-disable no-console */
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const {
  PULSAR_PORT, PULSAR_HOST, NODE_ENV, PULSAR_API_INSTANCE,
} = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: () => ({
        apiInstance: PULSAR_API_INSTANCE || 'https://spaceb.in/api',
      }),
    }),
  )
  .listen({ port: PULSAR_PORT || 3000, host: PULSAR_HOST || '0.0.0.0' }, (err) => {
    if (err) console.log('error', err);
  });
