import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ventas,
  Vehiculo,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasVehiculoController {
  constructor(
    @repository(VentasRepository) protected ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Ventas has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.ventasRepository.vehiculos(id).find(filter);
  }

  @post('/ventas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Ventas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ventas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInVentas',
            exclude: ['id'],
            optional: ['ventasId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.ventasRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/ventas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Ventas.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.ventasRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/ventas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Ventas.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.ventasRepository.vehiculos(id).delete(where);
  }
}
