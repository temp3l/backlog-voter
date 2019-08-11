import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Box, Container} from '../models';
import {BoxRepository} from '../repositories';

export class BoxContainerController {
  constructor(@repository(BoxRepository) public boxRepository: BoxRepository) {}

  @get('/boxes/{id}/container', {
    responses: {
      '200': {
        description: 'Container belonging to Box',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Container)},
          },
        },
      },
    },
  })
  async getContainer(@param.path.string('id') id: typeof Box.prototype.id): Promise<Container> {
    return this.boxRepository.container(id);
  }
}
