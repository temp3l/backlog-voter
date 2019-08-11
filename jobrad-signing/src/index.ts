import {JobradSigningApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {JobradSigningApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new JobradSigningApplication(options);
  await app.boot();
  await app.start();
  // https://loopback.io/doc/en/lb4/Server.html#configure-the-base-path
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  // console.log(`Try ${url}/ping`);

  return app;
}
