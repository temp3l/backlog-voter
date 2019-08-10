import {Request, RestBindings, get, ResponseObject} from '@loopback/rest';
import {inject} from '@loopback/context';
import {
  GENERIC_ERROR_RESPONSE,
  VALIDATION_ERROR_RESPONSE,
} from '../models/errorModel.definition';

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
    description:
      '<h3>Availability, Latency, API-Status</h3>' +
      '<ul><li>Debug interface for Salespartner integration</li>' +
      '<li>May be Integrated with Monitoring-Solutions <i>(Nagios/Icinga/...)</i></li>' +
      '<li><i>No rate-limiting!</i></li></ul>' +
      '<h3>Contract-Debugging</h3>' +
      "<ul><li>Request-Body will be echo'ed <b>after</b> successful validation <i>(if any)</li></li>" +
      '<li>Meaningful validation errors in JSON-Format</li></ul>',
    responses: {
      200: STATUS_RESPONSE,
      422: VALIDATION_ERROR_RESPONSE,
      default: GENERIC_ERROR_RESPONSE,
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
