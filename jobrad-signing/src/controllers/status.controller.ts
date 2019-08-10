import {Request, RestBindings, get, ResponseObject} from '@loopback/rest';
import {inject} from '@loopback/context';
import {
  errorModel,
  validationErrorModel,
} from '../models/errorModel.definition';

const RESPONSE_OK: ResponseObject = {
  description: 'Success Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description: 'Vertragseingang am Assona-Server',
            example: '2019-08-10T13:32:12.203Z',
          },
          url: {
            type: 'string',
            description: 'URL der Schnittstelle',
            example: '/status',
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
const RESPONSE_FAIL: ResponseObject = {
  description: 'Error Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description: 'Vertragseingang am Assona-Server',
            example: '2019-08-10T13:32:12.203Z',
          },
          url: {
            type: 'string',
            description: 'URL der Schnittstelle',
            example: '/status',
          },
          headers: {
            type: 'object',
            description: 'Debug auth-header and connection issues',
            properties: {'Content-Type': {type: 'string'}},
            additionalProperties: true,
          },
          error: errorModel,
        },
      },
    },
  },
};

const sampleErrors = [
  {
    statusCode: 400,
    name: 'BadRequestError',
    message: 'Request body is required',
    code: 'MISSING_REQUIRED_PARAMETER',
  },
  {
    statusCode: 400,
    name: 'SyntaxError',
    message: 'Unexpected token a in JSON at position 1',
  },
  {
    error: {
      statusCode: 422,
      name: 'UnprocessableEntityError',
      message:
        'The request body is invalid. See error object `details` property for more info.',
      code: 'VALIDATION_FAILED',
      details: [
        {
          path: '',
          code: 'required',
          message: "should have required property 'vendor'",
          info: {
            missingProperty: 'vendor',
          },
        },
        {
          path: '',
          code: 'required',
          message: "should have required property 'type'",
          info: {
            missingProperty: 'type',
          },
        },
      ],
    },
  },
];

export class StatusController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/status', {
    summary: 'API-Health-Check',
    description:
      '<h3>Availability, Latency, API-Status</h3>' +
      '<ul><li>Debug interface for Salespartner integration</li>' +
      '<li>May be Integrated with Monitoring-Solutions <i>(Nagios/Icinga/...)</i></li>' +
      '<li><i>No rate-limiting!</i></li></ul>' +
      '<h3>Contract-Debugging</h3>' +
      "<ul><li>Request-Body will be echo'ed <b>after</b> successful validation <i>(if any)</li></li>" +
      '<li>Meaningful validation errors in JSON-Format</li></ul>',
    responses: {
      200: RESPONSE_OK,
      422: validationErrorModel,
      default: RESPONSE_FAIL,
    },
  })
  status(): object {
    // Reply with a message, the current time, the url, and request headers
    return {
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
