import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Ventas,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoVentasController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/ventas', {
    responses: {
      '200': {
        description: 'Ventas belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ventas)},
          },
        },
      },
    },
  })
  async getVentas(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Ventas> {
    return this.vehiculoRepository.ventas(id);
  }
}
