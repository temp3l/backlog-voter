import {DefaultCrudRepository} from '@loopback/repository';
import {Template, TemplateRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TemplateRepository extends DefaultCrudRepository<
  Template,
  typeof Template.prototype.id,
  TemplateRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Template, dataSource);
  }
}
