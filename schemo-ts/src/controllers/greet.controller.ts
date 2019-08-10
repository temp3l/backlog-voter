import {Request, RestBindings, get, param} from '@loopback/rest';
import {inject} from '@loopback/context';

export class GreetController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}
  // post greet: @requestBody({content: {'application/json': {schema: {'x-ts-type': MyModel}}}})

  @get('/greet')
  greet(@param.query.string('name') name: string, @param.query.number('age') age: number): object {
    return {
      name: `hello ${name} `,
      age: Date.now(),
    };
  }
}
