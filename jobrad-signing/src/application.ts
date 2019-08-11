import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestBindings} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {Mem2DataSource} from './datasources/mem2.datasource';
// import {MongoooDataSource} from './datasources/mongooo.datasource';
// Information from package.json

import {OpenApiSpec} from '@loopback/rest';

function greet(name: string) {
  return `hello ${name}`;
}

const spec: OpenApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'LoopBack Application',
    version: '1.0.0',
  },
  paths: {
    '/': {
      get: {
        'x-operation': greet,
        parameters: [{name: 'name', in: 'query', schema: {type: 'string'}}],
        responses: {
          '200': {
            description: 'greeting text',
            content: {
              'application/json': {
                schema: {type: 'string'},
              },
            },
          },
        },
      },
    },
  },
};

console.log(spec);
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
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.api(spec);
  }

  setupDataSources() {
    this.bind('dataSources.memory').to(Mem2DataSource);
    //this.bind('dataSources.mongooo').to(MongoooDataSource);
  }
  setUpBindings(): void {
    this.bind(RestBindings.ERROR_WRITER_OPTIONS).to({debug: true});
  }
}
