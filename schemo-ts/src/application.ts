import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, ResponseObject} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
const GREET_RESPONSE_SCHEMA: ResponseObject = {
  description: 'Ping Response!!',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string', format: 'date'},
        },
      },
    },
  },
};

const spec = {
  openapi: '3.0.0',
  info: {title: 'Hello World App', version: '1.0.0'},
  paths: {
    '/greet': {
      get: {
        'x-operation-name': 'greet',
        'x-controller-name': 'GreetController',
        parameters: [
          {name: 'name', schema: {type: 'string'}, in: 'query'},
          {name: 'age', schema: {type: 'number'}, in: 'query'},
        ],
        responses: {'200': GREET_RESPONSE_SCHEMA},
      },
    },
  },
};

export class SchemoTsApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
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
}
