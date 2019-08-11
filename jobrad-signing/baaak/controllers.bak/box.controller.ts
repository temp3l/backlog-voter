import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Box} from '../models';
import {BoxRepository} from '../repositories';

export class BoxController {
  constructor(
    @repository(BoxRepository)
    public boxRepository : BoxRepository,
  ) {}

  @post('/boxes', {
    responses: {
      '200': {
        description: 'Box model instance',
        content: {'application/json': {schema: getModelSchemaRef(Box)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Box, {exclude: ['id']}),
        },
      },
    })
    box: Omit<Box, 'id'>,
  ): Promise<Box> {
    return this.boxRepository.create(box);
  }

  @get('/boxes/count', {
    responses: {
      '200': {
        description: 'Box model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Box)) where?: Where<Box>,
  ): Promise<Count> {
    return this.boxRepository.count(where);
  }

  @get('/boxes', {
    responses: {
      '200': {
        description: 'Array of Box model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Box)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Box)) filter?: Filter<Box>,
  ): Promise<Box[]> {
    return this.boxRepository.find(filter);
  }

  @patch('/boxes', {
    responses: {
      '200': {
        description: 'Box PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Box, {partial: true}),
        },
      },
    })
    box: Box,
    @param.query.object('where', getWhereSchemaFor(Box)) where?: Where<Box>,
  ): Promise<Count> {
    return this.boxRepository.updateAll(box, where);
  }

  @get('/boxes/{id}', {
    responses: {
      '200': {
        description: 'Box model instance',
        content: {'application/json': {schema: getModelSchemaRef(Box)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Box> {
    return this.boxRepository.findById(id);
  }

  @patch('/boxes/{id}', {
    responses: {
      '204': {
        description: 'Box PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Box, {partial: true}),
        },
      },
    })
    box: Box,
  ): Promise<void> {
    await this.boxRepository.updateById(id, box);
  }

  @put('/boxes/{id}', {
    responses: {
      '204': {
        description: 'Box PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() box: Box,
  ): Promise<void> {
    await this.boxRepository.replaceById(id, box);
  }

  @del('/boxes/{id}', {
    responses: {
      '204': {
        description: 'Box DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.boxRepository.deleteById(id);
  }
}
