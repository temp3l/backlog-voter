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
import {Template} from '../models';
import {TemplateRepository} from '../repositories';

export class TemplateController {
  constructor(
    @repository(TemplateRepository)
    public templateRepository : TemplateRepository,
  ) {}

  @post('/templates', {
    responses: {
      '200': {
        description: 'Template model instance',
        content: {'application/json': {schema: getModelSchemaRef(Template)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Template, {exclude: ['id']}),
        },
      },
    })
    template: Omit<Template, 'id'>,
  ): Promise<Template> {
    return this.templateRepository.create(template);
  }

  @get('/templates/count', {
    responses: {
      '200': {
        description: 'Template model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Template)) where?: Where<Template>,
  ): Promise<Count> {
    return this.templateRepository.count(where);
  }

  @get('/templates', {
    responses: {
      '200': {
        description: 'Array of Template model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Template)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Template)) filter?: Filter<Template>,
  ): Promise<Template[]> {
    return this.templateRepository.find(filter);
  }

  @patch('/templates', {
    responses: {
      '200': {
        description: 'Template PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Template, {partial: true}),
        },
      },
    })
    template: Template,
    @param.query.object('where', getWhereSchemaFor(Template)) where?: Where<Template>,
  ): Promise<Count> {
    return this.templateRepository.updateAll(template, where);
  }

  @get('/templates/{id}', {
    responses: {
      '200': {
        description: 'Template model instance',
        content: {'application/json': {schema: getModelSchemaRef(Template)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Template> {
    return this.templateRepository.findById(id);
  }

  @patch('/templates/{id}', {
    responses: {
      '204': {
        description: 'Template PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Template, {partial: true}),
        },
      },
    })
    template: Template,
  ): Promise<void> {
    await this.templateRepository.updateById(id, template);
  }

  @put('/templates/{id}', {
    responses: {
      '204': {
        description: 'Template PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() template: Template,
  ): Promise<void> {
    await this.templateRepository.replaceById(id, template);
  }

  @del('/templates/{id}', {
    responses: {
      '204': {
        description: 'Template DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.templateRepository.deleteById(id);
  }
}
