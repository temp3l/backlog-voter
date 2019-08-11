import {inject, Getter} from '@loopback/context';
import {DefaultCrudRepository, juggler, BelongsToAccessor, repository} from '@loopback/repository';
import {Box, BoxRelations, Container} from '../models';
import {ContainerRepository} from '../repositories';

export class BoxRepository extends DefaultCrudRepository<Box, typeof Box.prototype.id, BoxRelations> {
  public readonly container: BelongsToAccessor<Container, typeof Box.prototype.id>;

  constructor(
    //@inject('datasources.mongooo') dataSource: juggler.DataSource,
    @inject('datasources.mem2') dataSource: juggler.DataSource,
    @repository.getter('ContainerRepository') containerRepositoryGetter: Getter<ContainerRepository>,
  ) {
    super(Box, dataSource);
    this.container = this.createBelongsToAccessorFor('container', containerRepositoryGetter);
  }
}
