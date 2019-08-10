import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    indexes: {
      uniqueContractId: {keys: {contractId: 1}, options: {unique: true}},
    },
  },
})
export class Contract extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  contractId?: number;

  @property({
    type: 'string',
    required: true,
  })
  vendor: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'boolean',
    required: true,
  })
  done: boolean;

  @property({
    type: 'string',
    required: true,
    default: '0113454688',
  })
  phone: string;

  constructor(data?: Partial<Contract>) {
    super(data);
  }
}

export interface ContractRelations {
  // describe navigational properties here
}

export type ContractWithRelations = Contract & ContractRelations;
