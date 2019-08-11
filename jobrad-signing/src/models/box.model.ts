import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Container, ContainerWithRelations} from './container.model';
import {getJsonSchema} from '@loopback/repository-json-schema';

@model()
export class Box extends Entity {
  @property({type: 'string', id: true}) id: string;
  @property({type: 'string', required: true}) name: string;
  //@belongsTo(() => Container) containerId: string;

  @belongsTo(() => Container, {keyTo: 'containerId'}) containerId: string;

  constructor(data?: Partial<Box>) {
    super(data);
  }
}

export interface BoxRelations {
  container: ContainerWithRelations;
}

export type BoxWithRelations = Box & BoxRelations;
// ?"filter"={"include": [{"relation": "boxes"}]}
// ?"filter"={"include": [{"relation": "todos"}]}
// ?filter={"include": [{"relation": "boxes"}]}

export const myModelJson = getJsonSchema(Box, {includeRelations: 'container'});

console.log(myModelJson);
