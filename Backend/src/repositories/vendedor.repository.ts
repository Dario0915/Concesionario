import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vendedor, VendedorRelations, Ventas} from '../models';
import {VentasRepository} from './ventas.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.id,
  VendedorRelations
> {

  public readonly ventas: HasManyRepositoryFactory<Ventas, typeof Vendedor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Vendedor, dataSource);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
  }
}
