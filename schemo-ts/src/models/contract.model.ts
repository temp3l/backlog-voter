import {Entity, model} from '@loopback/repository';
import {contractDefinition} from './contract.definition';

@model(contractDefinition)
export class Contract extends Entity {}

export interface ContractRelations {
  // describe navigational properties here
}

export type ContractWithRelations = Contract & ContractRelations;
