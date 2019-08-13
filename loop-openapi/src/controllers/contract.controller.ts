import {Request, RestBindings, get, post, ResponseObject, requestBody} from '@loopback/rest';
import {inject} from '@loopback/context';
import {Contract, GENERIC_ERROR_RESPONSE} from '../models';
import {ContractRepository} from '../repositories';
import {repository} from '@loopback/repository';

const CONTRACT_RESPONSE: ResponseObject = {
  description: 'Contract Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {type: 'string'},
          date: {
            type: 'string',
            description: 'Vertragseingang am Assona-Server',
          },
          url: {
            type: 'string',
            description: 'URL der Schnittstelle',
          },
          contracts: {
            type: 'array',
            items: {
              'x-ts-type': Contract,
            },
          },
        },
      },
    },
  },
};

interface ContractResponse {
  message: string;
  date: Date;
  url: string;
  contracts: Contract[];
}

export class ContractController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository('ContractRepository')
    public contractRepository: ContractRepository,
  ) {}

  @get('/contracts', {
    responses: {
      200: CONTRACT_RESPONSE,
      204: {description: 'Success'},
      default: GENERIC_ERROR_RESPONSE,
    },
  })
  async list(): Promise<ContractResponse> {
    return {
      message: 'Assona, Ihr kompetenter Partner für Spezialversicherungen',
      date: new Date(),
      url: this.req.url,
      contracts: await this.contractRepository.find({}),
    };
  }

  @post('/contracts', {
    responses: {
      '200': {
        description: 'List of contracts',
        content: {
          'application/json': {schema: {'x-ts-type': Contract}},
        },
      },
    },
    requestBody: {
      content: {'application/json': {schema: {'x-ts-type': Contract}}},
    },
  })
  async addItem(
    @requestBody({description: 'Contract item'}) contract: Contract, ): Promise<Contract> {
    const foo = this.contractRepository.create(contract);
    return foo;
  }
}
