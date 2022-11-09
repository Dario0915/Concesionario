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
  Cliente,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasClienteController {
  constructor(
    @repository(VentasRepository) protected ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Ventas has one Cliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente> {
    return this.ventasRepository.cliente(id).get(filter);
  }

  @post('/ventas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Ventas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ventas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInVentas',
            exclude: ['id'],
            optional: ['ventasId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.ventasRepository.cliente(id).create(cliente);
  }

  @patch('/ventas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Ventas.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.ventasRepository.cliente(id).patch(cliente, where);
  }

  @del('/ventas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Ventas.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.ventasRepository.cliente(id).delete(where);
  }
}
