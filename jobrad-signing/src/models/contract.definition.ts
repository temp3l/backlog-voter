import {RequestBodyObject} from 'openapi3-ts';

export const contractRequestModel = {
  type: 'object',
  //required: ['vendor', 'price', 'done'],
  properties: {
    price: {type: 'string', required: true},
    vendor: {type: 'string'},
    type: {type: 'string', enum: ['bike', 'twike', 'dreik'], default: 'bike'},
    done: {type: 'string'},
  },
};

export const CONTRACT_REQUEST: RequestBodyObject = {
  description: 'Request Schema',
  content: {
    'application/json': {
      schema: {$ref: contractRequestModel},
    },
  },
};
