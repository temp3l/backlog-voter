import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Document, DocumentWithRelations} from './document.model';

@model({settings: {}})
export class Template extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    format: 'date',
  })
  date?: string;

  @belongsTo(() => Document)
  docId: number;

  constructor(data?: Partial<Template>) {
    super(data);
  }
}

export interface TemplateRelations {
  // describe navigational properties here
  document?: DocumentWithRelations;
}

export type TemplateWithRelations = Template & TemplateRelations;
