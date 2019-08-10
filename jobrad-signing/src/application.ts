import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestBindings} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {Mem2DataSource} from './datasources/mem2.datasource';

// Information from package.json

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}

export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const pkg: PackageInfo = require('../package.json');

export class JobradSigningApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(Object.assign({}, options, {rest: {port: 3000, host: '0.0.0.0'}}));
    this.setupDataSources();

    this.setUpBindings();

    this.sequence(MySequence); // Set up the custom sequence

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
  }

  setupDataSources() {
    this.bind('dataSources.memory').to(Mem2DataSource);
  }
  setUpBindings(): void {
    // Bind package.json to the application context
    this.bind(PackageKey).to(pkg);
    this.bind(RestBindings.ERROR_WRITER_OPTIONS).to({debug: true});
  }
}
