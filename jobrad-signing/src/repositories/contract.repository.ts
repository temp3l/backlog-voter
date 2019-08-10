import {DefaultCrudRepository} from '@loopback/repository';
import {Contract, ContractRelations} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContractRepository extends DefaultCrudRepository<
  Contract,
  typeof Contract.prototype.contractId,
  ContractRelations
> {
  constructor(@inject('datasources.memory') dataSource: MemoryDataSource) {
    super(Contract, dataSource);
  }
}
