import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Contract} from '../models';
import {inject} from '@loopback/context';

export class ContractRepository extends DefaultCrudRepository<
  Contract,
  typeof Contract.prototype.contractId
> {
  constructor(
    @inject('datasources.memory') protected datasource: juggler.DataSource,
  ) {
    super(Contract, datasource);
  }
}
