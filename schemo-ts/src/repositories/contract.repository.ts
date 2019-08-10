import {DefaultCrudRepository} from '@loopback/repository';
import {Contract, ContractRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContractRepository extends DefaultCrudRepository<Contract, string, ContractRelations> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Contract, dataSource);
  }
}
