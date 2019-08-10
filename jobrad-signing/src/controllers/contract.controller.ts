import {
  Request,
  RestBindings,
  get,
  post,
  ResponseObject,
  requestBody,
} from '@loopback/rest';
import {inject} from '@loopback/context';
import {Contract} from '../models';
// import * as debugFactory from 'debug';
// const debug = debugFactory('loopback:example:shopping');

export const accountDefinition = {
  name: 'Account',
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
      required: true,
      id: true,
    },
    customerNumber: {
      type: 'string',
      required: true,
    },
    balance: {
      type: 'number',
      required: true,
    },
    branch: {
      type: 'string',
      required: true,
    },
    type: {
      type: 'string',
      required: true,
    },
    avgBalance: {
      type: 'number',
    },
    minimumBalance: {
      type: 'number',
    },
  },
};
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
          headers: {
            type: 'object',
            description: 'Temporäre Hilfe für Salespartner - bis 15.09.2019',
            properties: {'Content-Type': {type: 'string'}},
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export class ContractController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /contract`
  @get('/contracts', {
    responses: {
      '200': CONTRACT_RESPONSE,
    },
  })
  Contract(): object {
    // Reply with a message, the current time, the url, and request headers
    return {
      message: 'Assona, Ihr kompetenter Partner für Spezialversicherungen',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  /**
   * Validate contract and persist to database
   * @param ... ...
   * @param cart Shopping cart item to be added
   */
  @post('/contracts', {
    responses: {
      '200': {
        description: 'User shopping cart item is created',
        content: {
          //'application/json': {schema: {'x-ts-type': Contract }},
          'application/json': {schema: {type: 'string'}},
        },
      },
    },
  })
  handleContract(
    //@param.path.string('userId') userId: string,
    @requestBody({description: 'shopping cart item'}) item: Contract,
  ): object {
    console.log(item);
    //return this.shoppingCartRepository.addItem(userId, item);
    return {
      code: 500,
    };
  }
}
/*
 '/accounts/create': {
      post: {
        'x-operation-name': 'createAccount',
        requestBody: {
          description: 'The account instance to create.',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Account',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Account',
                },
              },
            },
          },
        },
        parameters: [],
      },
    },*/
