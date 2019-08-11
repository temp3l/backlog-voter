import {Getter, inject} from '@loopback/context';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {Container, Box, BoxRelations} from '../models';
import {ContainerRepository} from '../repositories';
import {Mem2DataSource} from '../datasources';

export class BoxRepository extends DefaultCrudRepository<Box, typeof Box.prototype.id, BoxRelations> {
  public readonly container: BelongsToAccessor<Container, typeof Box.prototype.id>;

  constructor(
    @inject('datasources.mem2') dataSource: Mem2DataSource,
    @repository.getter('ContainerRepository')
    containerRepositoryGetter: Getter<ContainerRepository>,
  ) {
    super(Box, dataSource);
    this.container = this.createBelongsToAccessorFor('container', containerRepositoryGetter);
  }
}
