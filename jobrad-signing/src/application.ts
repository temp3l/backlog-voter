import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestBindings} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {Mem2DataSource} from './datasources/mem2.datasource';

export class JobradSigningApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(Object.assign({}, options, {rest: {port: 3000, host: '0.0.0.0'}}));
    this.setupDataSources();
    this.setUpBindings();

    this.sequence(MySequence); // Set up the custom sequence
    this.static('/', path.join(__dirname, '../public'));
    this.bind(RestExplorerBindings.CONFIG).to({path: '/explorer'});
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    //app.controller(MyController);
  }

  setupDataSources() {
    this.bind('dataSources.memory').to(Mem2DataSource);
    //this.bind('dataSources.mongooo').to(MongoooDataSource);
  }
  setUpBindings(): void {
    //this.bind(RestBindings.ERROR_WRITER_OPTIONS).to({debug: true});
  }
}
