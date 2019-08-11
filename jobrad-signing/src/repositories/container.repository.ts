import {Box, Container, ContainerRelations} from '../models';
import {BoxRepository} from './box.repository';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';
import {Mem2DataSource} from '../datasources';

export class ContainerRepository extends DefaultCrudRepository<Container, typeof Container.prototype.id, ContainerRelations> {
  public readonly boxes: HasManyRepositoryFactory<Box, typeof Container.prototype.id>;
  constructor(
    @inject('datasources.mem2') dataSource: Mem2DataSource,
    @repository.getter('BoxRepository')
    getBoxRepository: Getter<BoxRepository>,
  ) {
    super(Container, dataSource);
    this.boxes = this.createHasManyRepositoryFactoryFor('boxes', getBoxRepository);
  }
}
