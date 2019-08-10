import {Entity, model, property, hasMany} from '@loopback/repository';
import {Template} from './template.model';

@model({settings: {}})
export class Document extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  comment?: string;

  @hasMany(() => Template, {keyTo: 'docId'})
  templates: Template[];

  constructor(data?: Partial<Document>) {
    super(data);
  }
}

export interface DocumentRelations {
  // describe navigational properties here
}

export type DocumentWithRelations = Document & DocumentRelations;
