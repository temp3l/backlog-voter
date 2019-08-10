import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Template, Document, DocumentRelations} from '../models';
import {TemplateRepository} from './template.repository';

import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class DocumentRepository extends DefaultCrudRepository<
  Document,
  typeof Document.prototype.id,
  DocumentRelations
> {
  public readonly templates: HasManyRepositoryFactory<Template, typeof Template.prototype.id>;
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('TemplateRepository')
    getTemplateRepository: Getter<TemplateRepository>,
  ) {
    super(Document, dataSource);
    this.templates = this.createHasManyRepositoryFactoryFor('templates', getTemplateRepository);
  }
}
