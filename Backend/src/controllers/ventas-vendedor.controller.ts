import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ventas,
  Vendedor,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasVendedorController {
  constructor(
    @repository(VentasRepository)
    public ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/vendedor', {
    responses: {
      '200': {
        description: 'Vendedor belonging to Ventas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vendedor)},
          },
        },
      },
    },
  })
  async getVendedor(
    @param.path.string('id') id: typeof Ventas.prototype.id,
  ): Promise<Vendedor> {
    return this.ventasRepository.susVentas(id);
  }
}
