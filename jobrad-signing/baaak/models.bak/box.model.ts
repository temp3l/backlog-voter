import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Container, ContainerWithRelations} from './container.model';

@model()
export class Box extends Entity {
  @property({type: 'string', id: true}) id: string;
  @property({type: 'string', required: true}) name: string;
  @property({type: 'string', required: true}) size: number;
  @belongsTo(() => Container) containerId: string;

  constructor(data?: Partial<Box>) {
    super(data);
  }
}

export interface BoxRelations {
  container?: ContainerWithRelations;
}

export type BoxWithRelations = Box & BoxRelations;
