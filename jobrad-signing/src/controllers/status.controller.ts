import {Request, RestBindings, get, ResponseObject} from '@loopback/rest';
import {inject} from '@loopback/context';
import {GENERIC_ERROR_RESPONSE, VALIDATION_ERROR_RESPONSE} from '../models';
import {healtHTML} from '../assets/html';

const STATUS_RESPONSE: ResponseObject = {
  description: 'Success Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          received_at: {
            description: 'Vertragseingang am Assona-Server',
            type: 'string',
            format: 'date-time',
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
            // additionalProperties: true,
          },
        },
      },
    },
  },
};

export class StatusController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/status', {
    summary: 'API-Health-Check',
    description: healtHTML,
    responses: {
      200: STATUS_RESPONSE,
      422: VALIDATION_ERROR_RESPONSE,
      default: GENERIC_ERROR_RESPONSE,
    },
  })
  status(): object {
    // Reply with a message, the current time, the url, and request headers
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      received_at: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
