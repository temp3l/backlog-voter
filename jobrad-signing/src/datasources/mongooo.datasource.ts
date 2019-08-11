import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mongooo.datasource.json';

export class MongoooDataSource extends juggler.DataSource {
  static dataSourceName = 'mongooo';

  constructor(
    @inject('datasources.config.mongooo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
