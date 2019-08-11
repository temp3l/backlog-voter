import {Entity, model, property, hasMany} from '@loopback/repository';
import {Box} from './box.model';

@model()
export class Container extends Entity {
  @property({type: 'string', id: true}) id: string;
  @property({type: 'string', required: true}) name: string;

  @hasMany(() => Box, {keyTo: 'containerId'})
  boxes?: Box[];

  constructor(data?: Partial<Container>) {
    super(data);
  }
}

export interface ContainerRelations {
  // describe navigational properties here
}

export type ContainerWithRelations = Container & ContainerRelations;
