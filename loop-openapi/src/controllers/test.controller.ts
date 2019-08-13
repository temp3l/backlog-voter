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
import {Contract} from '../models';
import {ContractRepository} from '../repositories';

export class TestController {
  constructor(
    @repository(ContractRepository)
    public contractRepository : ContractRepository,
  ) {}

  @post('/contracts', {
    responses: {
      '200': {
        description: 'Contract model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contract)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, ),
        },
      },
    })
    contract: Omit<Contract, 'id'>,
  ): Promise<Contract> {
    return this.contractRepository.create(contract);
  }

  @get('/contracts/count', {
    responses: {
      '200': {
        description: 'Contract model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Contract)) where?: Where<Contract>,
  ): Promise<Count> {
    return this.contractRepository.count(where);
  }

  @get('/contracts', {
    responses: {
      '200': {
        description: 'Array of Contract model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contract)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Contract)) filter?: Filter<Contract>,
  ): Promise<Contract[]> {
    return this.contractRepository.find(filter);
  }

  @patch('/contracts', {
    responses: {
      '200': {
        description: 'Contract PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {partial: true}),
        },
      },
    })
    contract: Contract,
    @param.query.object('where', getWhereSchemaFor(Contract)) where?: Where<Contract>,
  ): Promise<Count> {
    return this.contractRepository.updateAll(contract, where);
  }

  @get('/contracts/{id}', {
    responses: {
      '200': {
        description: 'Contract model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contract)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Contract> {
    return this.contractRepository.findById(id);
  }

  @patch('/contracts/{id}', {
    responses: {
      '204': {
        description: 'Contract PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {partial: true}),
        },
      },
    })
    contract: Contract,
  ): Promise<void> {
    await this.contractRepository.updateById(id, contract);
  }

  @put('/contracts/{id}', {
    responses: {
      '204': {
        description: 'Contract PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contract: Contract,
  ): Promise<void> {
    await this.contractRepository.replaceById(id, contract);
  }

  @del('/contracts/{id}', {
    responses: {
      '204': {
        description: 'Contract DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contractRepository.deleteById(id);
  }
}
