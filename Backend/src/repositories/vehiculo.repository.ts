import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Proveedor, Ventas} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {VentasRepository} from './ventas.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Vehiculo.prototype.id>;

  public readonly ventas: BelongsToAccessor<Ventas, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.ventas = this.createBelongsToAccessorFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
