import {Entity, model, property} from '@loopback/repository';
//import {contractDefinition} from './contract.definition';
import {getJsonSchema} from '@loopback/repository-json-schema';

@model() //
export class Contract extends Entity {
  @property({id: true, required: true}) contractId: string;
  @property({required: true}) vendor: string;
  @property({required: true}) type: string;
  @property.array(String)
  arr: string[]; // explicitly passing in type information-orjust-array
}

export const ContractSchema = getJsonSchema(Contract);

console.log(ContractSchema);
export interface ContractRelations {
  // describe navigational properties here
}

export type ContractWithRelations = Contract & ContractRelations;
