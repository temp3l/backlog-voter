import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Container,
  Box,
} from '../models';
import {ContainerRepository} from '../repositories';

export class ContainerBoxController {
  constructor(
    @repository(ContainerRepository) protected containerRepository: ContainerRepository,
  ) { }

  @get('/containers/{id}/boxes', {
    responses: {
      '200': {
        description: 'Array of Box\'s belonging to Container',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Box)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Box>,
  ): Promise<Box[]> {
    return this.containerRepository.boxes(id).find(filter);
  }

  @post('/containers/{id}/boxes', {
    responses: {
      '200': {
        description: 'Container model instance',
        content: {'application/json': {schema: getModelSchemaRef(Box)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Container.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Box, {exclude: ['id']}),
        },
      },
    }) box: Omit<Box, 'id'>,
  ): Promise<Box> {
    return this.containerRepository.boxes(id).create(box);
  }

  @patch('/containers/{id}/boxes', {
    responses: {
      '200': {
        description: 'Container.Box PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Box, {partial: true}),
        },
      },
    })
    box: Partial<Box>,
    @param.query.object('where', getWhereSchemaFor(Box)) where?: Where<Box>,
  ): Promise<Count> {
    return this.containerRepository.boxes(id).patch(box, where);
  }

  @del('/containers/{id}/boxes', {
    responses: {
      '200': {
        description: 'Container.Box DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Box)) where?: Where<Box>,
  ): Promise<Count> {
    return this.containerRepository.boxes(id).delete(where);
  }
}
