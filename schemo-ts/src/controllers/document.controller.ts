import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
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
import {Document, DocumentRelations} from '../models';
import {DocumentRepository} from '../repositories';

export class DocumentController {
  constructor(
    @repository(DocumentRepository)
    public documentRepository: DocumentRepository,
  ) {}

  @post('/documents', {
    responses: {
      '200': {
        description: 'Document model instance',
        content: {'application/json': {schema: getModelSchemaRef(Document)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {exclude: ['id']}),
        },
      },
    })
    document: Omit<Document, 'id'>,
  ): Promise<Document> {
    return this.documentRepository.create(document);
  }

  @get('/documents/count', {
    responses: {
      '200': {
        description: 'Document model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.query.object('where', getWhereSchemaFor(Document)) where?: Where<Document>): Promise<Count> {
    return this.documentRepository.count(where);
  }

  @get('/documents', {
    responses: {
      '200': {
        description: 'Array of Document model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Document)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Document)) filter?: Filter<Document>,
  ): Promise<Document[]> {
    return this.documentRepository.find(filter);
  }

  @patch('/documents', {
    responses: {
      '200': {
        description: 'Document PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {partial: true}),
        },
      },
    })
    document: Document,
    @param.query.object('where', getWhereSchemaFor(Document)) where?: Where<Document>,
  ): Promise<Count> {
    return this.documentRepository.updateAll(document, where);
  }

  @get('/documents/{id}', {
    responses: {
      '200': {
        description: 'Document model instance',
        content: {'application/json': {schema: getModelSchemaRef(Document)}},
      },
    },
  })

  // findById(id: ID, filter?: Filter<T>, options?: Options): Promise<T & Relations>;
  async findById(
    @param.path.number('id') id: string,
    filter?: Filter<Document>,
  ): Promise<Document & DocumentRelations> {
    return this.documentRepository.findById(id);
  }

  @patch('/documents/{id}', {
    responses: {
      '204': {
        description: 'Document PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {partial: true}),
        },
      },
    })
    document: Document,
  ): Promise<void> {
    await this.documentRepository.updateById(id, document);
  }

  @put('/documents/{id}', {
    responses: {
      '204': {
        description: 'Document PUT success',
      },
    },
  })
  async replaceById(@param.path.number('id') id: string, @requestBody() document: Document): Promise<void> {
    await this.documentRepository.replaceById(id, document);
  }

  @del('/documents/{id}', {
    responses: {
      '204': {
        description: 'Document DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.documentRepository.deleteById(id);
  }
}
