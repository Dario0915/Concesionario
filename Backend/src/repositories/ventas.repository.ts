import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ventas, VentasRelations, Vehiculo, Vendedor, Cliente} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {VendedorRepository} from './vendedor.repository';
import {ClienteRepository} from './cliente.repository';

export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id,
  VentasRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Ventas.prototype.id>;

  public readonly susVentas: BelongsToAccessor<Vendedor, typeof Ventas.prototype.id>;

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Ventas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Ventas, dataSource);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.susVentas = this.createBelongsToAccessorFor('susVentas', vendedorRepositoryGetter,);
    this.registerInclusionResolver('susVentas', this.susVentas.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
