import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Campsites} from '../models';
import {CampsitesRepository} from '../repositories';

export class CampSitesController {
  constructor(
    @repository(CampsitesRepository)
    public campsitesRepository : CampsitesRepository,
  ) {}

  @post('/campsites')
  @response(200, {
    description: 'Campsites model instance',
    content: {'application/json': {schema: getModelSchemaRef(Campsites)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campsites, {
            title: 'NewCampsites',
            
          }),
        },
      },
    })
    campsites: Campsites,
  ): Promise<Campsites> {
    return this.campsitesRepository.create(campsites);
  }

  @get('/campsites/count')
  @response(200, {
    description: 'Campsites model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Campsites) where?: Where<Campsites>,
  ): Promise<Count> {
    return this.campsitesRepository.count(where);
  }

  @get('/campsites')
  @response(200, {
    description: 'Array of Campsites model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Campsites, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Campsites) filter?: Filter<Campsites>,
  ): Promise<Campsites[]> {
    return this.campsitesRepository.find(filter);
  }

  @patch('/campsites')
  @response(200, {
    description: 'Campsites PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campsites, {partial: true}),
        },
      },
    })
    campsites: Campsites,
    @param.where(Campsites) where?: Where<Campsites>,
  ): Promise<Count> {
    return this.campsitesRepository.updateAll(campsites, where);
  }

  @get('/campsites/{id}')
  @response(200, {
    description: 'Campsites model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Campsites, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Campsites, {exclude: 'where'}) filter?: FilterExcludingWhere<Campsites>
  ): Promise<Campsites> {
    return this.campsitesRepository.findById(id, filter);
  }

  @patch('/campsites/{id}')
  @response(204, {
    description: 'Campsites PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campsites, {partial: true}),
        },
      },
    })
    campsites: Campsites,
  ): Promise<void> {
    await this.campsitesRepository.updateById(id, campsites);
  }

  @put('/campsites/{id}')
  @response(204, {
    description: 'Campsites PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() campsites: Campsites,
  ): Promise<void> {
    await this.campsitesRepository.replaceById(id, campsites);
  }

  @del('/campsites/{id}')
  @response(204, {
    description: 'Campsites DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.campsitesRepository.deleteById(id);
  }
}
