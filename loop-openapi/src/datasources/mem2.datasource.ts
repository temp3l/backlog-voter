import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mem2.datasource.json';

export class Mem2DataSource extends juggler.DataSource {
  static dataSourceName = 'mem2';

  constructor(
    @inject('datasources.config.mem2', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
