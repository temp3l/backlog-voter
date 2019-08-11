import {Box, Container, ContainerRelations, ContainerWithRelations} from '../models';
import {BoxRepository} from './box.repository';
import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, Filter, HasManyRepositoryFactory, juggler, Options, repository} from '@loopback/repository';

// import {MongoooDataSource} from '../datasources';
// import {getJsonSchema} from '@loopback/repository-json-schema';

export class ContainerRepository extends DefaultCrudRepository<Container, typeof Container.prototype.id, ContainerRelations> {
  public readonly boxes: HasManyRepositoryFactory<Box, typeof Container.prototype.id>;

  constructor(
    //@inject('datasources.mongooo') dataSource: juggler.DataSource,
    @inject('datasources.mem2') dataSource: juggler.DataSource,
    @repository.getter('BoxRepository') protected getBoxRepository: Getter<BoxRepository>,
  ) {
    super(Container, dataSource);
    this.boxes = this.createHasManyRepositoryFactoryFor('boxes', getBoxRepository);
  }

  async find(filter?: Filter<Container>, options?: Options): Promise<ContainerWithRelations[]> {
    // Prevent juggler for applying "include" filter Juggler is not aware of LB4 relations
    const include = filter && filter.include;
    filter = {...filter, include: undefined};
    const result = await super.find(filter, options);

    // poor-mans inclusion resolver, this should be handled by DefaultCrudRepo
    // and use `inq` operator to fetch related boxes in fewer DB queries
    // this is a temporary implementation, please see
    // https://github.com/strongloop/loopback-next/issues/3195
    if (include && include.length && include[0].relation === 'boxes') {
      await Promise.all(
        result.map(async r => {
          // eslint-disable-next-line require-atomic-updates
          r.boxes = await this.boxes(r.id).find();
        }),
      );
    }

    return result;
  }
  async findById(id: typeof Container.prototype.id, filter?: Filter<Container>, options?: Options): Promise<ContainerWithRelations> {
    // Prevent juggler for applying "include" filter Juggler is not aware of LB4 relations
    const include = filter && filter.include;
    filter = {...filter, include: undefined};

    const result = await super.findById(id, filter, options);
    // poor-mans inclusion resolver, this should be handled by DefaultCrudRepo
    // and use `inq` operator to fetch related boxes in fewer DB queries
    // this is a temporary implementation, please see
    // https://github.com/strongloop/loopback-next/issues/3195
    if (include && include.length && include[0].relation === 'boxes') {
      result.boxes = await this.boxes(result.id).find();
    }

    return result;
  }
}

// console.log(JSON.stringify(getJsonSchema(Box, {includeRelations: true})));
// console.log(JSON.stringify(getJsonSchema(Box, {includeRelations: true}), null, 3));
